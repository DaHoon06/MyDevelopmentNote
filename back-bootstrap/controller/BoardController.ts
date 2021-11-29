import { DB } from '../db/db';
import { INTERFACES } from "../src/interfaces/InterFaces";
import IBoard = INTERFACES.IBoard;
import { paging } from "./pagination/config";

export class BoardController {
    constructor() {
    }

    async getBoardList(page: any){
        try{
            const client = await DB.MongoConn.getInstance.connect();
            const [allCount] = await client.db(DB.NAME).collection(DB.COLLECTIONS.Board).aggregate([
                {$match: { isDelete: 1}},
                {$count: 'allCount'},
            ]).toArray();

            if(isNaN(page)){
                page = 1
            }

            let {
                startPage,
                endPage,
                hidePost,
                maxPost,
                totalPage,
                currentPage
            } = paging(page, allCount);

            //전체 게시글과 게시글의 총합이 필요
            const boardData = await client.db(DB.NAME).collection(DB.COLLECTIONS.Board).aggregate([
                {$match: { isDelete: 1}},
                {$sort: {'_id': -1}},
                {$skip: hidePost},
                {$limit: maxPost},
            ]).toArray();

            console.log(hidePost,maxPost +' skip : limit')
            return {
                result: true,
                boardData,
                currentPage,
                totalPage,
            };
        } catch (e: any) {
            throw new Error(e);
        }

    }

    async insertData(data: IBoard){
        const client = await DB.MongoConn.getInstance.connect();
        const exists = await client.db(DB.NAME).collection(DB.COLLECTIONS.Board).insertOne({
            title: data.title,
            content: data.content,
            writer: data.writer,
            createData: new Date(),
            updatedDate: new Date(),
            isComment: 1,
            isDelete: 1,
            hit: 0,
        });

        if(exists) {
            return { result: true }
        }
        throw new Error('실패..');
    }
}