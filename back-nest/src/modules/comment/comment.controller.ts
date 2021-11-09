import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Res} from "@nestjs/common";
import {CommentService} from "./comment.service";
import {CommentDTO} from "./comment.dto";


@Controller('comment')
export class CommentController{
    constructor(private commentService: CommentService) {}

    @Get(':id')
    async getComment(@Param('id')id: string,@Res() res){
        console.log('GET Comment');
        const commentData = await this.commentService.getComment(id);

        if(!commentData){
            console.log('no data');
            return res.status(500).send({comments: 0});
        }
        return res.status(200).send({comments: commentData});
    }

    @Get('/p/:id')
    async detailComment(@Param('id') id: string,@Res() res){
        console.log('Detail COMMENT',id);
        const comment = await this.commentService.detailComment(id);
        return res.status(200).send(comment);
    }

    @Post()
    async insertComment(@Body() commentDTO: CommentDTO){
        console.log('INSERT COMMENT!!',commentDTO);
        await this.commentService.insertComment(commentDTO);
    }

    @Delete(':id')
    async deleteComment(@Param('id')id: string,@Res() res){
        const data = await this.commentService.deleteComment(id);
        if(data){
            return res.status(200).send({result: 1});
        }
        return res.status(500).send({result: 0});
    }

    @Patch(':id')
    async updateComment(@Param('id')id: string,
                        @Body() comment: CommentDTO,@Res() res){
        // console.log('PATCH COMMENT !!',comment);
        console.log(comment);
        const data = await this.commentService.updateComment(id,comment);
        if(data){
            return res.status(200).send({result: 1});
        }
        return res.status(500).send({result: 0});
    }

}