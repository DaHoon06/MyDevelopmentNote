import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Res} from "@nestjs/common";
import {CommentService} from "./comment.service";
import {CommentDTO} from "./comment.dto";

@Controller('comment')
export class CommentController{
    constructor(private commentService: CommentService) {}

    @Get(':id')
    async getComment(@Param('id')id: string,@Res() res){
        console.log('GET Comment : ');
        const commentData = await this.commentService.getComment(id);

        if(commentData === undefined){
            return res.status(500).send({msg: 'noData'});
        }
        console.log(commentData);
        return res.status(200).send({comments: commentData});
    }

    @Post()
    async insertComment(@Body() commentDTO: CommentDTO){
        console.log('INSERT COMMENT!!',commentDTO);
        await this.commentService.insertComment(commentDTO);
    }

    @Delete()
    async deleteComment(){

    }

    @Patch()
    async updateComment(){

    }

}