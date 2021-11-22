import { DB } from '../db/db';
import  { INTERFACES } from "../src/interfaces/IToDo";
import IToDo = INTERFACES.IToDo;

export class TodoController {

    constructor() {
    }

    async getTodoList(){
        const client = await DB.MongoConn.getInstance.connect();
        const exists = await client.db(DB.NAME).collection(DB.COLLECTIONS.ToDo).aggregate([
            {$match: { deleteCheck: 1}},
            { $group: {
                    _id: {
                        totalData: {
                            $cond: { if: { $eq: ["$doing", '1']}, then: '해야할일', else: {
                                    if: { $eq: ["$doing", '2']}, then: '진행중' ,else: '완료'}}
                        }
                    },
                }},
            { $sort: { updated_at : -1 }}
        ]);

        if(exists){
            return { result: true }
        }
        throw new Error('조회 실패');
    }

    async insertData_ToDo(toDo: IToDo){
        const client = await DB.MongoConn.getInstance.connect();
        const exists = await client.db(DB.NAME).collection(DB.COLLECTIONS.ToDo).insertOne({
            todo_content: toDo.todo_content,
            doing: '1',
            deleteCheck: '1',
            created_at: new Date(),
            updated_at: new Date(),
        });

        if(exists) {
            return { result: true }
        }
        throw new Error('실패..');
    }
}