import { DB } from '../db/db';
import { INTERFACES } from "../src/interfaces/InterFaces";
import IBoard = INTERFACES.IBoard;
import { paging } from "./pagination/config";
import { ObjectId } from "mongodb";

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

    async detailData(id: string){
        try {
            const obID = new ObjectId(id);
            const client = await DB.MongoConn.getInstance.connect();
            const exists = await client.db(DB.NAME).collection(DB.COLLECTIONS.Board).findOne({_id: obID});

            const data = {
                result: true,
                ...exists
            }

            if(exists.length !== 0){
                return {
                    data
                }
            }
            return { result: false }
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async deleteData(id: string){
        try {
            const obID = new ObjectId(id);
            const client = await DB.MongoConn.getInstance.connect();
            const exists = await client.db(DB.NAME).collection(DB.COLLECTIONS.Board).findOneAndUpdate({_id: obID}, {
                        $set: {isDelete: 2}
            });

            if(exists) return { result: true }
            return { result: false }
        }
         catch (e: any) {
            throw new Error(e);
        }
    }
}