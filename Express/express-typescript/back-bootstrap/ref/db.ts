import { Pool, createPool } from 'mariadb';
// import {IS_DEV} from '../env/env';
export namespace DB {
    export const config = {
        connectTimeout: 500000,
        user: 'pmi',
        password: 'Pmi12@!',
        host: '222.111.213.54',
    };

    export class MysqlConn {
        private static instance: MysqlConn;
        private db?: Pool;

        async connect() {
            try {
                if(this.db) return this.db;

                this.db = await createPool(config);
                console.warn('connect');
                return await this.db?.getConnection();
            } catch (e) {
                throw new Error(e);
            }

        }

        static get getInstance () {
            if(!MysqlConn.instance) MysqlConn.instance = new MysqlConn();
            return MysqlConn.instance;
        }
    }
}
