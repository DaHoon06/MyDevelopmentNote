import { DB } from '../db/db';
import { stream } from 'exceljs'

export namespace COMPANY {
    export interface IPage {
        pageNo: number,
        perPage: number,
    }

    export interface IFilter {
        keyword: string,
        companyType: string,
        mainProduct: string,
        companyLocation: string,
    }

    export class CompanyController {
        private excelOptions = {
            useStyles: true,
            useSharedStrings: true
        };

        constructor() {
        }

        async getList(page: IPage, filter: IFilter) {
            try {
                const { pageNo, perPage } = page;
                const { keyword, companyType, mainProduct, companyLocation } = filter;

                const condKeyword = keyword ? ` AND COMP_NAME LIKE '%${keyword}%' ` : '';
                const condCompanyType =  companyType ? ` AND GUBUN1 = '${companyType}' ` : '';
                const condMainProduct =  mainProduct ? ` AND MAIN_PROD_TYPE = '${mainProduct}' ` : ''
                const condCompanyLocation =  companyLocation ? ` AND ADDRESS LIKE '%${ companyLocation }%' ` : '';
                const firstPage = (pageNo - 1) * perPage;

                const query = `
                    SELECT
                      ROW_NUMBER() OVER(ORDER BY SEQ) AS ROW_NUM, 
                      c.* 
                    FROM pmi.COMPANY AS c
                    WHERE 1=1
                    ${ condKeyword }
                    ${ condCompanyType }
                    ${ condMainProduct }
                    ${ condCompanyLocation }
                    LIMIT ${ firstPage }, ${ perPage } `;

                const totalQuery = `
                    SELECT 
                      COUNT(*) AS totalPage
                    FROM pmi.COMPANY AS c
                    WHERE 1=1
                    ${ condKeyword }
                    ${ condCompanyType }
                    ${ condMainProduct }
                    ${ condCompanyLocation }`;

                const client = await DB.MysqlConn.getInstance.connect();
                const list = await client.query(query);
                const [totalPage] = await client.query(totalQuery);

                return {
                    list,
                    ...totalPage,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }

        }

        async excel (filter: IFilter): Promise<Buffer> {
            try {
                const { keyword, companyType, mainProduct, companyLocation } = filter;
                const condKeyword = keyword ? ` AND COMP_NAME LIKE '%${keyword}%' ` : '';
                const condCompanyType =  companyType ? ` AND GUBUN1 = '${companyType}' ` : '';
                const condMainProduct =  mainProduct ? ` and MAIN_PROD_TYPE = '${mainProduct}' ` : '';
                const condCompanyLocation =  companyLocation ? ` AND ADDRESS LIKE '%${ companyLocation }%' ` : '';

                const query =`
                    SELECT 
                      *
                    FROM pmi.COMPANY
                    WHERE 1=1
                    ${condKeyword}
                    ${condCompanyType}
                    ${condMainProduct}
                    ${condCompanyLocation}
                    ORDER BY SEQ`;

                const client = await DB.MysqlConn.getInstance.connect();
                const list = await client.query(query);
                const title = await client.query(`SELECT column_comment FROM information_schema.columns WHERE table_schema = 'pmi' AND table_name = 'COMPANY'`);
                const titles = title.map((r: any) => r.column_comment);

                const workbook = new stream.xlsx.WorkbookWriter(this.excelOptions);
                const worksheet = workbook.addWorksheet('제조업체');
                const rowTitle = worksheet.getRow(1);

                for (const [idx, key] of titles.entries()) {
                    worksheet.getColumn(idx + 1).width = 13;
                    rowTitle.getCell(idx + 1).value = key;
                }

                for(let l of list) {
                    worksheet.addRow(Object.values(l));
                }

                worksheet.commit();
                await workbook.commit();
                const readStream = (workbook as any).stream;

                return readStream.toBuffer();
            } catch (e) {
                throw new Error(e);
            }
        }

        async getDetail({ id }: { id: number }) {
            try {
                const client = await DB.MysqlConn.getInstance.connect();
                const recodeSet = await client.query(`SELECT * FROM pmi.COMPANY WHERE LIST_ID = ${ id }`) as any[];
                const company = recodeSet.find(r => r.LIST_ID === id);

                // if(company) company.FM_METHOD = company.FM_METHOD.replace(/\/$/,'');

                return {
                    company,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }
        }

        async getProdList(page: IPage, id: number) {
            try {
                const { pageNo, perPage } = page;
                const firstPage = (pageNo - 1) * perPage;

                const query = `
                    SELECT 
                      ROW_NUMBER() OVER(ORDER BY ID) AS ROW_NUM,
                      p.* 
                    FROM pmi.PRODUCT AS p
                    WHERE (LICENSE_NUMBER = ( SELECT LICENSE_NUMBER1 FROM pmi.COMPANY WHERE LIST_ID = ${ id } )
                    OR LICENSE_NUMBER = ( SELECT LICENSE_NUMBER2 FROM pmi.COMPANY WHERE LIST_ID = ${ id } ))
                    AND LICENSE_NUMBER <> ''
                    LIMIT ${firstPage}, ${perPage}`;

                const totalQuery = `
                    SELECT 
                        COUNT(*) AS totalPage
                    FROM pmi.PRODUCT
                    WHERE (LICENSE_NUMBER = ( SELECT LICENSE_NUMBER1 FROM pmi.COMPANY WHERE LIST_ID = ${ id } )
                    OR LICENSE_NUMBER = ( SELECT LICENSE_NUMBER2 FROM pmi.COMPANY WHERE LIST_ID = ${ id } ))
                    AND LICENSE_NUMBER <> ''`;

                const client = await DB.MysqlConn.getInstance.connect();
                const list = await client.query(query);
                const [totalPage] = await client.query(totalQuery);

                return {
                    list,
                    ...totalPage,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }

        }
    }
}



