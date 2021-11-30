import { MongoClient } from "mongodb";

export namespace DB {
    //DB
    export const NAME: string = 'DATA';

    //COLLECTION
    export enum COLLECTIONS {
        ToDo = 'ToDo',
        Board = 'Board',
    }

    export class MongoConn {
        // private connection: string = process.env.NODE_ENV ? 'mongodb://localhost:27017/localDB' : 'mongodb://localhost:27017/localDB';
        private connection: string = process.env.NODE_ENV !== 'development' ? `mongodb+srv://${process.env.atlasID}:${process.env.atlasPW}@cluster.qjven.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` : `mongodb+srv://${process.env.atlasID}:${process.env.atlasPW}@cluster.qjven.mongodb.net/test`;
        private static instance: MongoConn;
        private db ?: MongoClient;

        async connect(): Promise<MongoClient> {
            try {
                if(this.db && this.db.isConnected()) return this.db;
                this.db = new MongoClient(this.connection,{
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                console.warn('DB CONNECTED');
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