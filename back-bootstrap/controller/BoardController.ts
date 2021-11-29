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
            const [{allCount}] = await client.db(DB.NAME).collection(DB.COLLECTIONS.Board).aggregate([
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
            console.log(startPage,endPage,hidePost,maxPost,totalPage,currentPage);
            //전체 게시글과 게시글의 총합이 필요
            const boardData = await client.db(DB.NAME).collection(DB.COLLECTIONS.Board).aggregate([
                {$match: { isDelete: 1}},
                {$sort: {'_id': -1}},
                {$skip: hidePost},
                {$limit: maxPost},
            ]).toArray();

            if(boardData.length !== 0){
                return {
                    result: true,
                    boardData,
                    currentPage,
                    totalPage,
                };
            }
            return {result: false};

        } catch (e: any) {
            throw new Error(e);
        }

    }

    async insertData(data: IBoard){
        try {
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
        } catch (e: any) {
            throw new Error(e);
        }
    }
}