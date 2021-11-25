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
            //게시글 토탈 개수를 굳이 2개로 나눌 필요가 있을까
            const [{allCount}] = await client.db(DB.NAME).collection(DB.COLLECTIONS.Board).aggregate([
                {$match: { isDelete: 1}},
                {$count: 'allCount'},
            ]).toArray();
            let {
                startPage,
                endPage,
                hidePost,
                maxPost,
                totalPage,
                currentPage
            } = paging(page, allCount);

            //전체 게시글과 게시글의 총합이 필요
            const boardData = await  client.db(DB.NAME).collection(DB.COLLECTIONS.Board).aggregate([
                {$match: { isDelete: 1}},
                {$sort: {'_id': -1}},
                // {$skip: `${hidePost}`},
                // {$limit: `${maxPost}`},
                {$skip: 0},
                {$limit: 10},
            ]).toArray().catch((err: any) => {
                console.log('test',err);
            });
            console.log(boardData,allCount);

            return {
                result: true,
                boardData
            };
        } catch (e) {
            throw new Error('ERROR!');
        }

    }
}