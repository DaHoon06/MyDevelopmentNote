import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
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

    async updateComment(){

    };
    async deleteComment(){

    };


}
