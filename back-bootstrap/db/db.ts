import {MongoClient} from "mongodb";

export namespace DB {
    //DB
    export const NAME: string = 'localDB';

    //COLLECTION
    export enum COLLECTIONS {
        ToDo = 'ToDo',
    }

    export class MongoConn {
        private connection: string = process.env.NODE_ENV ? 'mongodb://localhost:27017/localDB' : 'mongodb://localhost:27017/localDB';//주소
        private static instance: MongoConn;
        private db ?: MongoClient;

        async connect(): Promise<MongoClient> {
            try {
                if(this.db) return this.db; // && this.db.isConnected()
                console.warn(this.connection);

                this.db = new MongoClient(this.connection);
                console.warn('CONNECTED !!');
                return await this.db.connect();
            } catch (e: any) {
                throw new Error(e);
            }
        }

        static get getInstance() {
            if(!MongoConn.instance) MongoConn.instance = new MongoConn();
            return MongoConn.instance;
        }
    }
}