import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Schema, Types} from "mongoose";
import {CommentDB, CommentDocument} from "../DB/schemas/board/comment.schema";
import {CommentDTO} from './comment.dto'

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(CommentDB.name)
        private commentModel: Model<CommentDocument>) {}

    async getComment(id): Promise<CommentDB[]>{
        return this.commentModel.find({b_id: id}).sort({'_id': -1}).exec();
    };

    async insertComment(commentData: CommentDTO): Promise<CommentDB>{
        commentData.created_at = new Date();
        commentData.updated_at = new Date();
        commentData.c_writer = '다훈';

        const insertComment = new this.commentModel(commentData);
        return insertComment.save();
    };

    async detailComment(id){
        return this.commentModel.findById(id).exec();
    };

    async updateComment(id: string, comment): Promise<boolean>{
        comment.updated_at = new Date();

        const $filter = {_id: id};
        const $update = {...comment};

        try{
            await this.commentModel.updateOne($filter,$update);
        }catch (e) {
            throw new Error('UPDATE중 에러');
        }
        return true;
    };

    async deleteComment(id){
        return this.commentModel.deleteOne({_id: id}).exec();
    };


}
