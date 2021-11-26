import { DB } from '../db/db';
import { INTERFACES } from "../src/interfaces/InterFaces";
import IToDo = INTERFACES.IToDo;
import { ObjectId } from "mongodb";

export class TodoController {

    constructor() {
    }

    async getTodoList(){
        const client = await DB.MongoConn.getInstance.connect();
        const exists = await client.db(DB.NAME).collection(DB.COLLECTIONS.ToDo).aggregate([
            {$match: { deleteCheck: '1'}},
            {$group: {
                    _id: {
                        doing: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ['$doing', '2']}, then: '진행중'},
                                    { case: { $eq: ['$doing', '3']}, then: '완료'},
                                ],
                                default: '해야할일'
                            }
                        },
                        todo_content: '$todo_content',
                        updated_at: '$updated_at',
                        obId: '$_id'
                    },
                }},
            {$sort: { '_id': -1 }},
        ]).toArray();
        if(exists){
            return {
                result: true,
                exists
            }
        }
        throw new Error('조회 실패');
    }

    async insertData_ToDo(toDo: IToDo){
        const client = await DB.MongoConn.getInstance.connect();
        const exists = await client.db(DB.NAME).collection(DB.COLLECTIONS.ToDo).insertOne({
            todo_content: toDo.todo_content,
            doing: '1',
            deleteCheck: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        if(exists) {
            return { result: true }
        }
        throw new Error('실패..');
    }

    async doing(id: string){
        const do_id = new ObjectId(id);
        const client = await DB.MongoConn.getInstance.connect();
        const exists = await client.db(DB.NAME).collection(DB.COLLECTIONS.ToDo).updateOne({'_id': do_id},{
            '$set': {'doing': '2','updatedAt': new Date},
        });
        if(exists){
            return {result: true}
        }
        return {result: false}
    }

    async deleteData(id: string) {
        const delete_id = new ObjectId(id);
        const client = await DB.MongoConn.getInstance.connect();
        const exists = await client.db(DB.NAME).collection(DB.COLLECTIONS.ToDo).updateOne({'_id': delete_id},{
            '$set': {'deleteCheck': '2','updatedAt': new Date},
        });

        if(exists){
            return {result: true}
        }
        return {result: false}
    }
}