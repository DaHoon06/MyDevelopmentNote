import { DB } from '../db/db';
import { stream, Worksheet } from 'exceljs'

export namespace LOOKUP {

    export interface IPage {
        pageNo: number,
        perPage: number,
    }

    export interface IFilter {
        keyword: string,
        year: string,
        dataType?: string,
        mainProduct?: string,
    }

    export interface IQueryInfo {
        table?: string,
        condQuery?: string,
        sumGroup?: string,
        selectQuery?: string,
        sumQuery?: string,
        subTotal?: string,
        ord?: string,
    }

    export enum TABLE {
        REVENUE = 'DATA_REVENUE',
        WORKER = 'DATA_WORKER',
        MATERIAL = 'DATA_MATERIAL',
        PROD = 'DATA_PROD',
        EXPORT = 'DATA_EXPORT',
        RF_PROD = 'DATA_RF_PROD',
        RF_SALE = 'DATA_RF_SALE',
    }

    export enum SUM_GROUP {
        PROD = 'MAIN_PROD_CODE',
        YEAR = 'CHK_YEAR',
    }

    export class lookupController {
        private excelOptions = {
            useStyles: true,
            useSharedStrings: true,
        };
        constructor() {
        }

        async revenue(page: IPage, filter: IFilter, dataType: string) {
            try {
                const table = TABLE.REVENUE;
                const condQuery = this.queryCond(filter, { table });

                const subTotal = this.querySumRevenue('* c.WT');
                const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                let list: [];
                let totalPage = { totalPage: 0 };

                const client = await DB.MysqlConn.getInstance.connect();

                if(dataType === 'all') {
                    const ord = 'SEQ';
                    const selectQuery = this.queryRevenue();
                    const mainQuery = this.queryAll(page, { condQuery, selectQuery, ord });
                    list = await client.query(mainQuery + subTotalQuery);

                    const countQuery = this.queryCount({ condQuery });
                    const [count] = await client.query(countQuery);
                    totalPage = count;
                } else {
                    const sumGroup = SUM_GROUP.PROD;
                    const sumQuery = this.querySumRevenue();
                    const mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    list = await client.query(mainQuery + subTotalQuery);
                }

                return {
                    list,
                    ...totalPage,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }
        }

        revenueExcel (filter: IFilter, dataType: string): Promise<Buffer> {
            return new Promise(async (resolve, reject) => {
                try {
                    const table = TABLE.REVENUE;
                    const condQuery = this.queryCond(filter, { table });

                    let mainQuery = '';

                    if(dataType === 'all') {
                        const ord = 'SEQ';
                        const selectQuery = this.queryRevenue();
                        mainQuery = this.queryExcel({ condQuery, selectQuery, ord });
                    } else {
                        const sumGroup = SUM_GROUP.PROD;
                        const sumQuery = this.querySumRevenue();
                        mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    }

                    const subTotal = this.querySumRevenue('* c.WT');
                    const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                    const client = await DB.MysqlConn.getInstance.connect();
                    const list = await client.query(mainQuery + subTotalQuery);

                    const workbook = new stream.xlsx.WorkbookWriter(this.excelOptions);
                    const worksheet = workbook.addWorksheet('?????????');

                    const titles = [
                        '??????',
                        '?????????',
                        '??? ???????????? ??????',
                        '2018??? ?????? ?????????',
                        '2019??? ?????? ?????????',
                        '2020??? ?????? ?????????',
                        '2018??? ??????????????? ?????????',
                        '2019??? ??????????????? ?????????',
                        '2020??? ??????????????? ?????????',
                    ];

                    await this.fillSheet(worksheet, list, titles);

                    await workbook.commit();
                    const readStream = (workbook as any).stream;

                    return resolve(readStream.toBuffer());
                } catch (e) {
                    console.log(e);
                    return reject(e);
                }
            });
        }


        async worker(page: IPage, filter: IFilter, dataType: string) {
            try {
                const table = TABLE.WORKER;
                const condQuery = this.queryCond(filter, { table });

                const subTotal = this.querySumWorker('* c.WT');
                const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                let list: [];
                let totalPage = { totalPage: 0 };

                const client = await DB.MysqlConn.getInstance.connect();

                if(dataType === 'all') {
                    const ord = 'SEQ,CHK_YEAR';
                    const selectQuery = this.queryWorker();
                    const mainQuery = this.queryAll(page, { condQuery, selectQuery, ord });
                    list = await client.query(mainQuery + subTotalQuery);

                    const countQuery = this.queryCount({ condQuery });
                    const [count] = await client.query(countQuery);
                    totalPage = count;
                } else {
                    const sumGroup = SUM_GROUP.PROD;
                    const sumQuery = this.querySumWorker();
                    const mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    list = await client.query(mainQuery + subTotalQuery);
                }

                return {
                    list,
                    ...totalPage,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }
        }

        workerExcel (filter: IFilter, dataType: string): Promise<Buffer> {
            return new Promise(async (resolve, reject) => {
                try {
                    const table = TABLE.WORKER;
                    const condQuery = this.queryCond(filter, { table });

                    let mainQuery = '';

                    if(dataType === 'all') {
                        const ord = 'SEQ,CHK_YEAR';
                        const selectQuery = this.queryWorker();
                        mainQuery = this.queryExcel({ condQuery, selectQuery, ord });
                    } else {
                        const sumGroup = SUM_GROUP.PROD;
                        const sumQuery = this.querySumWorker();
                        mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    }

                    const subTotal = this.querySumWorker('* c.WT');
                    const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                    const client = await DB.MysqlConn.getInstance.connect();
                    const list = await client.query(mainQuery + subTotalQuery);

                    const workbook = new stream.xlsx.WorkbookWriter(this.excelOptions);
                    const worksheet = workbook.addWorksheet('????????????');

                    const titles = [
                        '??????',
                        '?????????',
                        '??? ???????????? ??????',
                        '?????? ?????????',
                        '?????? ????????????',
                        '?????? ?????????',
                        '?????? ????????????',
                        '??? ?????????',
                        '????????? ?????? ?????????',
                        '????????????'
                    ];

                    await this.fillSheet(worksheet, list, titles);

                    await workbook.commit();
                    const readStream = (workbook as any).stream;

                    return resolve(readStream.toBuffer());
                } catch (e) {
                    console.log(e);
                    return reject(e);
                }
            });
        }

        async material(page: IPage, filter: IFilter, dataType: string) {
            try {
                const table = TABLE.MATERIAL;
                const condQuery = this.queryCond(filter, { table });

                const subTotal = this.querySumMaterial('* c.WT');
                const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                let list: [];
                let totalPage = { totalPage: 0 };

                const client = await DB.MysqlConn.getInstance.connect();

                if(dataType === 'all') {
                    const ord = 'SEQ,CHK_YEAR';
                    const selectQuery = this.queryMaterial();
                    const mainQuery = this.queryAll(page, { condQuery, selectQuery, ord });
                    list = await client.query(mainQuery + subTotalQuery);

                    const countQuery = this.queryCount({ condQuery });
                    const [count] = await client.query(countQuery);
                    totalPage = count;
                } else {
                    const sumGroup = SUM_GROUP.PROD;
                    const sumQuery = this.querySumMaterial();
                    const mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    list = await client.query(mainQuery + subTotalQuery);
                }

                return {
                    list,
                    ...totalPage,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }

        }

        materialExcel (filter: IFilter, dataType: string): Promise<Buffer> {
            return new Promise(async (resolve, reject) => {
                try {
                    const table = TABLE.MATERIAL;
                    const condQuery = this.queryCond(filter, { table });

                    let mainQuery = '';

                    if(dataType === 'all') {
                        const ord = 'SEQ,CHK_YEAR';
                        const selectQuery = this.queryMaterial();
                        mainQuery = this.queryExcel({ condQuery, selectQuery, ord });
                    } else {
                        const sumGroup = SUM_GROUP.PROD;
                        const sumQuery = this.querySumMaterial();
                        mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    }

                    const subTotal = this.querySumMaterial('* c.WT');
                    const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                    const client = await DB.MysqlConn.getInstance.connect();
                    const list = await client.query(mainQuery + subTotalQuery);

                    const workbook = new stream.xlsx.WorkbookWriter(this.excelOptions);
                    const worksheet = workbook.addWorksheet('????????????');

                    const titles = [
                        '??????',
                        '?????????',
                        '??? ???????????? ??????',
                        '????????? ??? ?????????',
                        '????????? ??? ?????????',
                        '??????1',
                        '????????? ?????????',
                        '?????? ?????????',
                        '????????? ?????????',
                        '????????? ?????????',
                        '??????2',
                        '??????',
                        '????????????',
                    ];

                    await this.fillSheet(worksheet, list, titles);
                    await workbook.commit();
                    const readStream = (workbook as any).stream;

                    return resolve(readStream.toBuffer());
                } catch (e) {
                    console.log(e);
                    return reject(e);
                }
            });
        }

        async production(page: IPage, filter: IFilter, dataType: string) {
            try {
                const table = TABLE.PROD;
                const condQuery = this.queryCond(filter, { table });

                const subTotal = this.querySumProd();
                const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                let list: [];
                let totalPage = { totalPage: 0 };

                const client = await DB.MysqlConn.getInstance.connect();

                if(dataType === 'all') {
                    const ord = 'SEQ,CHK_YEAR';
                    const selectQuery = this.queryProd();
                    const mainQuery = this.queryAll(page, { condQuery, selectQuery, ord });
                    list = await client.query(mainQuery + subTotalQuery);

                    const countQuery = this.queryCount({ condQuery });
                    const [count] = await client.query(countQuery);
                    totalPage = count;
                } else {
                    const sumGroup = SUM_GROUP.PROD;
                    const sumQuery = subTotal;
                    const mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    list = await client.query(mainQuery + subTotalQuery);
                }

                return {
                    list,
                    ...totalPage,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }

        }

        productionExcel (filter: IFilter, dataType: string): Promise<Buffer> {
            return new Promise(async (resolve, reject) => {
                try {
                    const table = TABLE.PROD;
                    const condQuery = this.queryCond(filter, { table });

                    const subTotal = this.querySumProd();
                    const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                    let mainQuery = '';

                    if(dataType === 'all') {
                        const ord = 'SEQ,CHK_YEAR';
                        const selectQuery = this.queryProd();
                        mainQuery = this.queryExcel({ condQuery, selectQuery, ord });
                    } else {
                        const sumGroup = SUM_GROUP.PROD;
                        const sumQuery = subTotal;
                        mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    }

                    const client = await DB.MysqlConn.getInstance.connect();
                    const list = await client.query(mainQuery + subTotalQuery);

                    const workbook = new stream.xlsx.WorkbookWriter(this.excelOptions);
                    const worksheet = workbook.addWorksheet('?????? ??? ??????');

                    const titles = [
                        '??????',
                        '?????????',
                        '??? ???????????? ??????',
                        '?????????',
                        '????????????',
                        'OEM',
                        '?????????',
                        '?????????',
                        '?????????',
                        '?????????',
                        '????????????',
                        '??????',
                        '??????',
                        '????????????',
                    ];

                    await this.fillSheet(worksheet, list, titles);
                    await workbook.commit();
                    const readStream = (workbook as any).stream;

                    return resolve(readStream.toBuffer());
                } catch (e) {
                    console.log(e);
                    return reject(e);
                }
            });
        }

        async export(page: IPage, filter: IFilter, dataType: string) {
            try {
                const table = TABLE.EXPORT;
                const condQuery = this.queryCond(filter, { table });

                const subTotal = this.querySumExport();
                const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                let list: [];
                let totalPage = { totalPage: 0 };

                const client = await DB.MysqlConn.getInstance.connect();

                if(dataType === 'all') {
                    const ord = 'SEQ,CHK_YEAR';
                    const selectQuery = this.queryExport();
                    const mainQuery = this.queryAll(page, { condQuery, selectQuery, ord });
                    list = await client.query(mainQuery + subTotalQuery);

                    const countQuery = this.queryCount({ condQuery });
                    const [count] = await client.query(countQuery);
                    totalPage = count;
                } else {
                    const sumGroup = SUM_GROUP.PROD;
                    const sumQuery = subTotal;
                    const mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    list = await client.query(mainQuery + subTotalQuery);
                }

                return {
                    list,
                    ...totalPage,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }

        }

        exportExcel (filter: IFilter, dataType: string): Promise<Buffer> {
            return new Promise(async (resolve, reject) => {
                try {
                    const table = TABLE.EXPORT;
                    const condQuery = this.queryCond(filter, { table });

                    const subTotal = this.querySumExport();
                    const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                    let mainQuery = '';

                    if(dataType === 'all') {
                        const ord = 'SEQ,CHK_YEAR';
                        const selectQuery = this.queryExport();
                        mainQuery = this.queryExcel({ condQuery, selectQuery, ord });
                    } else {
                        const sumGroup = SUM_GROUP.PROD;
                        const sumQuery = subTotal;
                        mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    }

                    const client = await DB.MysqlConn.getInstance.connect();
                    const list = await client.query(mainQuery + subTotalQuery);

                    const workbook = new stream.xlsx.WorkbookWriter(this.excelOptions);
                    const worksheet = workbook.addWorksheet('????????????');

                    const titles = [
                        '??????',
                        '?????????',
                        '??? ???????????? ??????',
                        '????????????',
                        '?????????',
                        '??? ?????????',
                        '????????????',
                    ];

                    await this.fillSheet(worksheet, list, titles);
                    await workbook.commit();
                    const readStream = (workbook as any).stream;

                    return resolve(readStream.toBuffer());
                } catch (e) {
                    console.log(e);
                    return reject(e);
                }
            });
        }

        async riceProd(page: IPage, filter: IFilter, dataType: string) {
            try {
                const table = TABLE.RF_PROD;
                const condQuery = this.queryCond(filter, { table });

                const subTotal = this.querySumRfProd();
                const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                let list: [];
                let totalPage = { totalPage: 0 };

                const client = await DB.MysqlConn.getInstance.connect();

                if(dataType === 'all') {
                    const ord = 'SEQ,CHK_YEAR';
                    const selectQuery = this.queryRfProd();
                    const mainQuery = this.queryAll(page, { condQuery, selectQuery, ord });
                    list = await client.query(mainQuery + subTotalQuery);

                    const countQuery = this.queryCount({ condQuery });
                    const [count] = await client.query(countQuery);
                    totalPage = count;
                } else {
                    const sumGroup = SUM_GROUP.YEAR;
                    const sumQuery = subTotal;
                    const mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    list = await client.query(mainQuery + subTotalQuery);
                }

                return {
                    list,
                    ...totalPage,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }
        }

        riceProdExcel (filter: IFilter, dataType: string): Promise<Buffer> {
            return new Promise(async (resolve, reject) => {
                try {
                    const table = TABLE.RF_PROD;
                    const condQuery = this.queryCond(filter, { table });

                    const subTotal = this.querySumRfProd();
                    const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                    let mainQuery = '';

                    if(dataType === 'all') {
                        const ord = 'SEQ,CHK_YEAR';
                        const selectQuery = this.queryRfProd();
                        mainQuery = this.queryExcel({ condQuery, selectQuery, ord });
                    } else {
                        const sumGroup = SUM_GROUP.YEAR;
                        const sumQuery = subTotal;
                        mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    }

                    const client = await DB.MysqlConn.getInstance.connect();
                    const list = await client.query(mainQuery + subTotalQuery);

                    const workbook = new stream.xlsx.WorkbookWriter(this.excelOptions);
                    const worksheet = workbook.addWorksheet('?????????(???????????????)');

                    const titles = [
                        '??????',
                        '?????????',
                        '????????????',
                        '??????',
                        '????????????',
                        '?????????',
                        '????????????',
                        '??????',
                        '??????',
                        '??????',
                    ];

                    await this.fillSheet(worksheet, list, titles);

                    await workbook.commit();
                    const readStream = (workbook as any).stream;

                    return resolve(readStream.toBuffer());
                } catch (e) {
                    console.log(e);
                    return reject(e);
                }
            });
        }

        async riceSale(page: IPage, filter: IFilter, dataType: string) {
            try {
                const table = TABLE.RF_SALE;
                const condQuery = this.queryCond(filter, { table });

                const subTotal = this.querySumRfSale();
                const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                let list: [];
                let totalPage = { totalPage: 0 };

                const client = await DB.MysqlConn.getInstance.connect();

                if(dataType === 'all') {
                    const ord = 'SEQ,CHK_YEAR';
                    const selectQuery = this.queryRfSale();
                    const mainQuery = this.queryAll(page, { condQuery, selectQuery, ord });
                    list = await client.query(mainQuery + subTotalQuery);

                    const countQuery = this.queryCount({ condQuery });
                    const [count] = await client.query(countQuery);
                    totalPage = count;
                } else {
                    const sumGroup = SUM_GROUP.YEAR;
                    const sumQuery = subTotal;
                    const mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    list = await client.query(mainQuery + subTotalQuery);
                }

                return {
                    list,
                    ...totalPage,
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
            }
        }

        riceSaleExcel (filter: IFilter, dataType: string): Promise<Buffer> {
            return new Promise(async (resolve, reject) => {
                try {
                    const table = TABLE.RF_SALE;
                    const condQuery = this.queryCond(filter, { table });

                    const subTotal = this.querySumRfSale();
                    const subTotalQuery = this.querySubTotal({ condQuery, subTotal });

                    let mainQuery = '';

                    if(dataType === 'all') {
                        const ord = 'SEQ,CHK_YEAR';
                        const selectQuery = this.queryRfSale();
                        mainQuery = this.queryExcel({ condQuery, selectQuery, ord });
                    } else {
                        const sumGroup = SUM_GROUP.YEAR;
                        const sumQuery = subTotal;
                        mainQuery = this.querySum({ condQuery, sumQuery, sumGroup });
                    }

                    const client = await DB.MysqlConn.getInstance.connect();
                    const list = await client.query(mainQuery + subTotalQuery);

                    const workbook = new stream.xlsx.WorkbookWriter(this.excelOptions);
                    const worksheet = workbook.addWorksheet('?????????(???????????????)');

                    const titles = [
                        '??????',
                        '?????????',
                        '????????????',
                        '??????',
                        '??????',
                        '???',
                        '??????/??????',
                        '???',
                        '???',
                        '??????',
                        '??????',
                        '??????',
                        '??????',
                    ];

                    await this.fillSheet(worksheet, list, titles);

                    await workbook.commit();
                    const readStream = (workbook as any).stream;

                    return resolve(readStream.toBuffer());
                } catch (e) {
                    console.log(e);
                    return reject(e);
                }
            });
        }

        private queryRevenue() {
            return `
              COMP_NAME, MAIN_PROD_TYPE,
              TOTAL_2018, TOTAL_2019, TOTAL_2020, 
              RFD_2018, RFD_2019, RFD_2020, MAIN_PROD_CODE `;
        }

        private querySumRevenue(subTotal = '') {
            return `
              '-' AS COMP_NAME,
              MAIN_PROD_TYPE,
              ROUND(SUM(TOTAL_2018 ${subTotal}), 3) AS TOTAL_2018,
              ROUND(SUM(TOTAL_2019 ${subTotal}), 3) AS TOTAL_2019,
              ROUND(SUM(TOTAL_2020 ${subTotal}), 3) AS TOTAL_2020,
              ROUND(SUM(RFD_2018 ${subTotal}), 3) AS RFD_2018,
              ROUND(SUM(RFD_2019 ${subTotal}), 3) AS RFD_2019,
              ROUND(SUM(RFD_2020 ${subTotal}), 3) AS RFD_2020,
              MAIN_PROD_CODE`;
        }

        private queryWorker() {
            return `
              COMP_NAME, MAIN_PROD_TYPE,
              MALE1, MALE2, FEMALE1, FEMALE2,
              WORKER_TOTAL, WORKER_RICE, CHK_YEAR, MAIN_PROD_CODE`;
        }

        private querySumWorker(subTotal = '') {
            return `
              '-' AS COMP_NAME, MAIN_PROD_TYPE,
              ROUND(SUM(MALE1 ${subTotal}),3) AS MALE1,
              ROUND(SUM(MALE2 ${subTotal}),3) AS MALE2,
              ROUND(SUM(FEMALE1 ${subTotal}),3) AS FEMALE1,
              ROUND(SUM(FEMALE2 ${subTotal}),3) AS FEMALE2,
              ROUND(SUM(WORKER_TOTAL ${subTotal}),3) AS WORKER_TOTAL,
              ROUND(SUM(WORKER_RICE ${subTotal}),3) AS WORKER_RICE,
              CHK_YEAR AS YEAR,
              MAIN_PROD_CODE`;
        }

        private queryMaterial() {
            return `
              COMP_NAME, MAIN_PROD_TYPE,
              RICE1, RICE2, SUB_TOTAL1,
              RICE3, RICE4, RICE5, RICE6, SUB_TOTAL2,
              TOTAL, CHK_YEAR, MAIN_PROD_CODE`
        }

        private querySumMaterial(subTotal = '') {
            return `
                '-' AS COMP_NAME, MAIN_PROD_TYPE,
                ROUND(SUM(RICE1 ${subTotal}),3) AS RICE1,
                ROUND(SUM(RICE2 ${subTotal}),3) AS RICE2,
                ROUND(SUM(SUB_TOTAL1 ${subTotal}),3) AS SUB_TOTAL1,
                ROUND(SUM(RICE3 ${subTotal}),3) AS RICE3,
                ROUND(SUM(RICE4 ${subTotal}),3) AS RICE4,
                ROUND(SUM(RICE5 ${subTotal}),3) AS RICE5,
                ROUND(SUM(RICE6 ${subTotal}),3) AS RICE6,
                ROUND(SUM(SUB_TOTAL2 ${subTotal}),3) AS SUB_TOTAL2,
                ROUND(SUM(TOTAL ${subTotal}),3) AS TOTAL,
                CHK_YEAR AS YEAR, MAIN_PROD_CODE`
        }

        private queryProd() {
            return `
              COMP_NAME, MAIN_PROD_TYPE, PROD_COUNT, REVENUE_RATIO,
              SALES_TYPE1, SALES_TYPE2, SALES_TYPE3, SALES_TYPE4,
              SALES_TYPE5, SALES_TYPE6, SALES_TYPE7, SALES_TYPE8,
              CHK_YEAR, MAIN_PROD_CODE`;
        }

        private querySumProd() {
            return `
              '-' AS COMP_NAME,
            MAIN_PROD_TYPE,
            SUM(PROD_COUNT) AS PROD_COUNT,
            ROUND(AVG(IFNULL(REVENUE_RATIO,0)),2) AS REVENUE_RATIO,
            ROUND(AVG(IFNULL(SALES_TYPE1,0)),2) AS SALES_TYPE1,
            ROUND(AVG(IFNULL(SALES_TYPE2,0)),2) AS SALES_TYPE2,
            ROUND(AVG(IFNULL(SALES_TYPE3,0)),2) AS SALES_TYPE3,
            ROUND(AVG(IFNULL(SALES_TYPE4,0)),2) AS SALES_TYPE4,
            ROUND(AVG(IFNULL(SALES_TYPE5,0)),2) AS SALES_TYPE5,
            ROUND(AVG(IFNULL(SALES_TYPE6,0)),2) AS SALES_TYPE6,
            ROUND(AVG(IFNULL(SALES_TYPE7,0)),2) AS SALES_TYPE7,
            ROUND(AVG(IFNULL(SALES_TYPE8,0)),2) AS SALES_TYPE8,
            CHK_YEAR AS YEAR,
            MAIN_PROD_CODE`;
        }

        private queryExport() {
            return `
              COMP_NAME, MAIN_PROD_TYPE,
              EXPORT_AMOUNT, EXPORT_REVENUE,
              RICE_USAGE, CHK_YEAR, MAIN_PROD_CODE`;
        }

        private querySumExport() {
            return `
                '-' AS COMP_NAME,
                MAIN_PROD_TYPE,
                SUM(EXPORT_AMOUNT) AS EXPORT_AMOUNT,
                SUM(EXPORT_REVENUE) AS EXPORT_REVENUE,
                SUM(RICE_USAGE) AS RICE_USAGE,
                CHK_YEAR AS YEAR,
                MAIN_PROD_CODE`;
        }

        private queryRfProd() {
            return `
              COMP_NAME, CHK_YEAR, USAGE_TOTAL,
              USAGE1, USAGE2, USAGE3,
              USAGE4, USAGE5, USAGE6`;
        }

        private querySumRfProd() {
            return `
                '-' AS COMP_NAME,
                CHK_YEAR,
                SUM(USAGE_TOTAL) AS USAGE_TOTAL,
                SUM(USAGE1) AS USAGE1,
                SUM(USAGE2) AS USAGE2,
                SUM(USAGE3) AS USAGE3,
                SUM(USAGE4) AS USAGE4,
                SUM(USAGE5) AS USAGE5,
                SUM(USAGE6) AS USAGE6`;
        }

        private queryRfSale() {
            return `
              COMP_NAME, CHK_YEAR, USAGE_TOTAL,
              USAGE1, USAGE2, USAGE3,
              USAGE4, USAGE5, USAGE6,
              USAGE7, USAGE8, USAGE9`;
        }

        private querySumRfSale() {
            return `
                '-' AS COMP_NAME,
                CHK_YEAR,
                SUM(USAGE_TOTAL) AS USAGE_TOTAL,
                SUM(USAGE1) AS USAGE1,
                SUM(USAGE2) AS USAGE2,
                SUM(USAGE3) AS USAGE3,
                SUM(USAGE4) AS USAGE4,
                SUM(USAGE5) AS USAGE5,
                SUM(USAGE6) AS USAGE6,
                SUM(USAGE7) AS USAGE7,
                SUM(USAGE8) AS USAGE8,
                SUM(USAGE9) AS USAGE9`;
        }

        private queryCond(filter: IFilter, { table }: IQueryInfo ) {
            try {
                const { keyword, mainProduct, year } = filter;

                const condKeyword = keyword ? ` AND COMP_NAME LIKE '%${keyword}%' ` : '';
                const condMainProduct =  mainProduct ? ` and MAIN_PROD_TYPE = '${mainProduct}' ` : '';
                const condYear = year ? ` AND CHK_YEAR = ${year} ` : '';

                return `
                    FROM pmi.${table} AS d
                    LEFT JOIN pmi.COMPANY as c
                      ON c.LIST_ID = d.LIST_ID
                    WHERE 1=1
                    ${condKeyword}
                    ${condMainProduct}
                    ${condYear}
                `

            } catch(e) {
                throw new Error(e);
            }
        }

        private queryCount({ condQuery }: IQueryInfo) {
            return `SELECT COUNT(*) AS totalPage ${ condQuery }`;
        }

        private queryAll({ pageNo, perPage }: IPage, { condQuery, selectQuery, ord }: IQueryInfo) {
            try {
                const firstPage = (pageNo - 1) * perPage;

                return `
                    (SELECT 
                      ROW_NUMBER() OVER(ORDER BY ${ ord }) as ROW_NUM,
                      ${ selectQuery }
                    ${ condQuery }
                    LIMIT ${ firstPage }, ${ perPage })`;

            } catch(e) {
                throw new Error(e);
            }
        }

        private querySum({ condQuery, sumGroup, sumQuery }: IQueryInfo) {
            try {
                return `(SELECT 
                  ROW_NUMBER() OVER(ORDER BY ${ sumGroup }) AS ROW_NUM,
                  ${ sumQuery }
                  ${ condQuery }
                  GROUP BY ${ sumGroup }
                  ORDER BY MAIN_PROD_CODE)`;
            } catch(e) {
                throw new Error(e);
            }
        }

        private queryExcel({ condQuery, selectQuery, ord }: IQueryInfo) {
            try {
                return `
                (SELECT 
                      ROW_NUMBER() OVER(ORDER BY ${ord}) AS ROW_NUM,
                      ${ selectQuery }
                    ${ condQuery })`

            } catch(e) {
                throw new Error(e);
            }
        }

        private querySubTotal({ condQuery, subTotal }: IQueryInfo) {
            return `UNION ALL (SELECT 0 as ROW_NUM, ${ subTotal } ${ condQuery })`;
        }

        private async fillSheet (worksheet: Worksheet, list: any[], titles: string[]) {
            try {
                const rowTitle = worksheet.getRow(1);

                for (const [idx, key] of titles.entries()) {
                    worksheet.getColumn(idx + 1).width = 13;
                    rowTitle.getCell(idx + 1).value = key;
                }

                const subTotal = list.pop();
                subTotal.MAIN_PROD_CODE = '';

                const subTotals = Object.values(subTotal);
                subTotals.splice(0,3);
                worksheet.addRow(['??????','??????','??????',...subTotals]);

                for(let l of list) {
                    l.MAIN_PROD_CODE = '';
                    worksheet.addRow(Object.values(l));
                }

                worksheet.commit();
            } catch (e) {
                throw new Error(e);
            }
        }
    }
}



