import { DB } from '../db/db';
import { CognitoIdentityCredentials, config, S3 } from "aws-sdk";

export namespace UPLOAD {
    export interface IPage {
        pageNo: number,
        perPage: number,
        companyId: string,
    }

    export interface IID {
        companyId: string,
        prodId: string,
    }

    export interface IProdInfo {
        MENUFACT_NAME: string,
        PRODUCT_NAME: string,
        PRODUCT_CODE: string,
        PRODUCT_STANDARD: string,
        PRODUCT_UNIT: string,
        PRODUCT_BOX: string,
        DELIVERY_UNIT_PRICE: string,
        FACTORY_PRICE: string,
        RELEASE_PRICE: string,
        RR_PRICE: string,
        MENUFACT_NO: string,
        MENUFACT_TYPE: string,
        EXPIRATION_DT: string,
        STORAGE_METHOD: string,
        INNER_MATERIAL: string,
        OUTTER_MATERIAL: string,
        PURPOSE: string,
        PRODUCT_GROUP: string,
        HS_CODE: string,
        BOX_WIDTH: string,
        BOX_HEIGHT: string,
        BOX_VERTICAL: string,
        BOX_CBM: string,
        BOX_MOQ: string,
        MADE_IN: string,
        MEAT_YN: string,
        CHINA_MARK_YN: string,
        EXPORT_YN: string,
        EXPORT_COUNTRY: string,
        PRODUCT_CONTENT: string,
        LANG: string,
        USE_YN: string,
        REG_ID: string,
    }

    export interface IUploadInfo {
        prodInfo: IProdInfo,
        imageInfo: any[],
        uploadedImageCount: number,
        companyId: string,
        prodId?: string,
    }

    export class UploadController {
        private s3: S3;
        private S3_INFO = {
            Region: 'ap-northeast-2',
            IdentityPoolId: 'ap-northeast-2:af8aac42-d491-43c5-a086-c7f069b4940b',
            Bucket: 'krfa-image',
        }

        constructor() {
            config.update({
                region: this.S3_INFO.Region,
                credentials: new CognitoIdentityCredentials({
                    IdentityPoolId: this.S3_INFO.IdentityPoolId
                })
            });
            this.s3 = new S3({
                apiVersion: '2006-03-01',
                params: {Bucket: this.S3_INFO.Bucket}
            });
        }

        getS3Info() {
            const { Region, IdentityPoolId, Bucket } = this.S3_INFO
            return {
                result: true,
                Region,
                IdentityPoolId,
                Bucket,
                params: {
                    apiVersion: '2006-03-01',
                    params: { Bucket }
                }
            }
        }

        async getUploadList(page: IPage) {
            try {
                const { pageNo, perPage, companyId } = page;
                const firstPage = (pageNo - 1) * perPage;

                const compCond = companyId === '0' ? '' :  `AND REG_ID = ${ companyId }`

                const query = `
                    SELECT 
                        ROW_NUMBER() OVER(ORDER BY SEQ DESC) AS ROW_NUM,
                        c.* 
                    FROM pmi.UPLOAD AS c
                    WHERE USE_YN = 'Y'
                    ${ compCond } 
                    
                    LIMIT ${firstPage}, ${perPage}`;

                const totalQuery = `
                    SELECT 
                        COUNT(*) AS totalPage
                    FROM pmi.UPLOAD AS c
                    WHERE USE_YN = 'Y'
                    ${ compCond } `;

                const client = await DB.MysqlConn.getInstance.connect();
                const list = await client.query(query);
                const [totalPage] = await client.query(totalQuery);

                return {
                    result: true,
                    list,
                    ...totalPage,
                }
            } catch (e) {
                throw new Error(e);
            }
        }

        async getUploadInfo({ companyId, prodId } : IID) {
            try {
                const client = await DB.MysqlConn.getInstance.connect();

                let prodInfo = {};
                let imageInfo = [];
                if(prodId) {
                    [prodInfo] = await client.query(`SELECT * FROM pmi.UPLOAD WHERE USE_YN = 'Y' AND REG_ID = ${ companyId } AND PRODUCT_CODE = '${ prodId }'`)
                    imageInfo = await client.query(`SELECT * FROM pmi.UPLOAD_IMAGE WHERE REG_ID = '${ companyId }' AND PRODUCT_CODE = '${ prodId }'`)
                } else {
                    [prodInfo] = await client.query(`SELECT COUNT(*) + 1 AS PRODUCT_CODE FROM pmi.UPLOAD WHERE REG_ID = ${ companyId }`)
                }

                const result = prodInfo ? true : false

                return {
                    result,
                    imageInfo,
                    prodInfo,
                }
            } catch (e) {
                throw new Error(e);
            }
        }

        async upload(uploadInfo: IUploadInfo) {
            try {
                const { prodInfo, companyId, prodId, imageInfo, uploadedImageCount } = uploadInfo;
                const client = await DB.MysqlConn.getInstance.connect();

                const {
                    PRODUCT_CODE,
                    MENUFACT_NAME = '',
                    PRODUCT_NAME = '',
                    PRODUCT_STANDARD = '',
                    PRODUCT_UNIT = '',
                    PRODUCT_BOX = '',
                    DELIVERY_UNIT_PRICE = '',
                    FACTORY_PRICE = '',
                    RELEASE_PRICE = '',
                    RR_PRICE = '',
                    MENUFACT_NO = '',
                    MENUFACT_TYPE = '',
                    EXPIRATION_DT = '',
                    STORAGE_METHOD = '',
                    INNER_MATERIAL = '',
                    OUTTER_MATERIAL = '',
                    PURPOSE = '',
                    PRODUCT_GROUP = '',
                    HS_CODE = '',
                    BOX_WIDTH = '',
                    BOX_HEIGHT = '',
                    BOX_VERTICAL = '',
                    BOX_CBM = '',
                    BOX_MOQ = '',
                    MADE_IN = '',
                    MEAT_YN = '',
                    CHINA_MARK_YN = '',
                    EXPORT_YN = '',
                    EXPORT_COUNTRY = '',
                    PRODUCT_CONTENT = '',
                    REG_ID = ''
                } = prodInfo;

                const insertQuery = `
                            INSERT INTO pmi.UPLOAD (
                                PRODUCT_CODE, 
                                MENUFACT_NAME, 
                                PRODUCT_NAME, 
                                PRODUCT_STANDARD, 
                                PRODUCT_UNIT, 
                                PRODUCT_BOX,
                                DELIVERY_UNIT_PRICE, 
                                FACTORY_PRICE, 
                                RELEASE_PRICE, 
                                RR_PRICE, 
                                MENUFACT_NO, 
                                MENUFACT_TYPE,
                                EXPIRATION_DT, 
                                STORAGE_METHOD, 
                                INNER_MATERIAL, 
                                OUTTER_MATERIAL, 
                                PURPOSE, 
                                PRODUCT_GROUP,
                                HS_CODE, 
                                BOX_WIDTH, 
                                BOX_HEIGHT, 
                                BOX_VERTICAL, 
                                BOX_CBM, 
                                BOX_MOQ, 
                                MADE_IN, 
                                MEAT_YN,
                                CHINA_MARK_YN, 
                                EXPORT_YN, 
                                EXPORT_COUNTRY, 
                                PRODUCT_CONTENT, 
                                LANG, 
                                USE_YN, 
                                REG_ID
                            ) VALUES (
                                '${PRODUCT_CODE}',
                                '${MENUFACT_NAME}',
                                '${PRODUCT_NAME}',
                                '${PRODUCT_STANDARD}',
                                '${PRODUCT_UNIT}',
                                '${PRODUCT_BOX}',
                                '${DELIVERY_UNIT_PRICE}', 
                                '${FACTORY_PRICE}', 
                                '${RELEASE_PRICE}', 
                                '${RR_PRICE}', 
                                '${MENUFACT_NO}', 
                                '${MENUFACT_TYPE}',
                                '${EXPIRATION_DT}', 
                                '${STORAGE_METHOD}', 
                                '${INNER_MATERIAL}', 
                                '${OUTTER_MATERIAL}', 
                                '${PURPOSE}', 
                                '${PRODUCT_GROUP}',
                                '${HS_CODE}', 
                                '${BOX_WIDTH}', 
                                '${BOX_HEIGHT}', 
                                '${BOX_VERTICAL}', 
                                '${BOX_CBM}', 
                                '${BOX_MOQ}', 
                                '${MADE_IN}', 
                                '${MEAT_YN}',
                                '${CHINA_MARK_YN}', 
                                '${EXPORT_YN}', 
                                '${EXPORT_COUNTRY}', 
                                '${PRODUCT_CONTENT}', 
                                'KO', 
                                'Y', 
                                '${REG_ID}'
                            ) ON DUPLICATE KEY UPDATE 
                                MENUFACT_NAME = '${ MENUFACT_NAME }',
                                PRODUCT_NAME = '${ PRODUCT_NAME }', 
                                PRODUCT_STANDARD = '${ PRODUCT_STANDARD }',
                                PRODUCT_UNIT = '${ PRODUCT_UNIT }',
                                PRODUCT_BOX = '${ PRODUCT_BOX }',
                                DELIVERY_UNIT_PRICE = '${ DELIVERY_UNIT_PRICE }',
                                FACTORY_PRICE = '${ FACTORY_PRICE }',
                                RELEASE_PRICE = '${ RELEASE_PRICE }',
                                RR_PRICE = '${ RR_PRICE }',
                                MENUFACT_NO = '${ MENUFACT_NO }',
                                MENUFACT_TYPE = '${ MENUFACT_TYPE }',
                                EXPIRATION_DT = '${ EXPIRATION_DT }',
                                STORAGE_METHOD = '${ STORAGE_METHOD }',
                                INNER_MATERIAL = '${ INNER_MATERIAL }',
                                OUTTER_MATERIAL = '${ OUTTER_MATERIAL }',
                                PURPOSE = '${ PURPOSE }',
                                PRODUCT_GROUP = '${ PRODUCT_GROUP }', 
                                HS_CODE = '${ HS_CODE }', 
                                BOX_WIDTH = '${ BOX_WIDTH }',
                                BOX_HEIGHT = '${ BOX_HEIGHT }', 
                                BOX_VERTICAL = '${ BOX_VERTICAL }', 
                                BOX_CBM = '${ BOX_CBM }', 
                                BOX_MOQ = '${ BOX_MOQ }',
                                MADE_IN = '${ MADE_IN }',
                                MEAT_YN = '${ MEAT_YN }', 
                                CHINA_MARK_YN = '${ CHINA_MARK_YN }',
                                EXPORT_YN = '${ EXPORT_YN }',
                                EXPORT_COUNTRY = '${ EXPORT_COUNTRY }', 
                                PRODUCT_CONTENT = '${ PRODUCT_CONTENT }'
                            `;

                await client.query(insertQuery);

                if(imageInfo.length){
                    const insertImageValues = imageInfo
                        .reduce((acc, cur, idx) => {
                            const imageOrder = 1 + idx + uploadedImageCount
                            return acc + `,('${ cur.key }','${ cur.url }','${ cur.name }',${ imageOrder },'${ REG_ID }','${ PRODUCT_CODE }')`
                        },'')
                        .replace(/^,/,'');

                    await client.query(`
                        INSERT INTO pmi.UPLOAD_IMAGE
                            (IMAGE_KEY, IMAGE_URL, IMAGE_NAME, IMAGE_ORDER, REG_ID, PRODUCT_CODE)
                        VALUES
                            ${ insertImageValues }`
                    );
                }

                return {
                    list: [],
                    result: true,
                }
            } catch (e) {
                throw new Error(e);
                // throw new Error('잠시후에 다시 시도해주세요');
            }

        }

        async deleteProduct({ companyId, prodId }: IID) {
            try {
                const client = await DB.MysqlConn.getInstance.connect();
                const images = await client.query(`SELECT IMAGE_KEY FROM pmi.UPLOAD_IMAGE WHERE REG_ID = '${ companyId }' AND PRODUCT_CODE = '${ prodId }'`)
                await client.query(`UPDATE pmi.UPLOAD SET USE_YN = 'N' WHERE REG_ID = '${ companyId }' AND PRODUCT_CODE = '${ prodId }'`)
                await client.query(`DELETE FROM pmi.UPLOAD_IMAGE WHERE REG_ID = '${ companyId }' AND PRODUCT_CODE = '${ prodId }'`)

                for(let image of images) {
                    await this.deleteS3({ Key: image.IMAGE_KEY });
                }
            } catch (e) {
                throw new Error(e)
            }
        }

        private async deleteS3 ({ Key }: { Key: string }): Promise<S3.DeleteObjectOutput> {
            return new Promise((resolve, reject) => {
                this.s3.deleteObject({
                    Bucket: this.S3_INFO.Bucket, Key
                }, (err, data) => {
                    if (err) return reject(err);
                    return resolve(data);
                })
            });
        }

        async deleteImage({ companyId, prodId, key: Key }: { companyId: string, prodId: string, key: string }) {
            try {
                const client = await DB.MysqlConn.getInstance.connect();
                await client.query(`DELETE FROM pmi.UPLOAD_IMAGE WHERE REG_ID = '${ companyId }' AND PRODUCT_CODE = '${ prodId }' AND IMAGE_KEY = '${ Key }'`)
                await this.deleteS3({ Key })
            } catch (e) {
                throw new Error(e);
            }
        }

    }


}



