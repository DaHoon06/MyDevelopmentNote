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
            const boardData = await  client.db(DB.NAME).collection(DB.COLLECTIONS.Board).aggregate([
                {$match: { isDelete: 1}},
                {$sort: {'_id': -1}},
                {$skip: hidePost},
                {$limit: maxPost},
            ]).toArray();

            console.log(hidePost,maxPost +' 총 페이지 : 현재 페이지')
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
}