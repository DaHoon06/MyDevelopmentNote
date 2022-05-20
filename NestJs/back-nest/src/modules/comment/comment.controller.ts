import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Res} from "@nestjs/common";
import {CommentService} from "./comment.service";
import {CommentDTO} from "./comment.dto";


@Controller('comment')
export class CommentController{
    constructor(private commentService: CommentService) {}

    @Get(':id')
    async getComment(@Param('id') id: string){
        console.log('GET Comment',id);
        const data =  await this.commentService.getComment(id);
        console.log(data)
        return data;
    }
/*
    @Get('/p/:id')
    async detailComment(@Param('id') id: string,@Res() res){
        console.log('Detail COMMENT',id);
        const data = await this.commentService.detailComment(id);
        return { data };
    }
*/
    @Post()
    async insertComment(@Body() commentDTO: CommentDTO){
        console.log('INSERT COMMENT!!',commentDTO);
        const data = await this.commentService.insertComment(commentDTO);

        if(data){
            return { result: true };
        }
        return { result: false };
    }

    @Delete(':id')
    async deleteComment(@Param('id')id: string,@Res() res){
        const data = await this.commentService.deleteComment(id);
        if(data){
            return {result: true};
        }
        return {result: false};
    }

    @Patch(':id')
    async updateComment(@Param('id')id: string,
                        @Body() comment: CommentDTO,@Res() res){
        // console.log('PATCH COMMENT !!',comment);
        console.log(comment);
        const data = await this.commentService.updateComment(id,comment);
        if(data){
            return res.status(200).send({result: true});
        }
        return res.status(500).send({result: false});
    }

}