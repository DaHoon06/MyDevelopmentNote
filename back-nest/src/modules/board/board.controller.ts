import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Patch,
  Post,
  Res, UseGuards,
} from '@nestjs/common';
import { boardDTO } from './board.dto';
import { BoardService } from './board.service';
import { AuthGuard } from "@nestjs/passport";


@Controller('board')
export class BoardController {
  constructor(
      private boardService: BoardService
  ) {}

  @Get(':page?')
  async getBoard(@Param('page') page: string) {
    console.log('Get Board page : ',page);
    const { data } = await this.boardService.getBoard(page);

    if (!data.result) {
      console.log('게시글이 존재하지 않습니다.');
      return {
        data:{
        result: false
        }};
    }
    return data  ;
  }



  @UseGuards(AuthGuard('jwt'))
  @Post()
  async insertData(@Body() boardDTO: boardDTO) {
    const data = await this.boardService.insertData(boardDTO);
    if(data){
      return { result: true }
    }
    return { result: false }
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get('/d/:id')
  async getDetailBoard(@Param('id') id: string) {
    console.log(id)
    return  await this.boardService.getDetailBoard(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateBoard(@Body() boardDTO: boardDTO,
                    @Param('id') id: string) {
    console.log('put!!',boardDTO,id);
    const data = await this.boardService.updateBoard(id,boardDTO);
    if(data){
      return { result: true }
    }
    return { result: false }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteBoardData(@Param('id') id: string) {
    console.log('delete')
    const data = await this.boardService.deleteBoardData(id);

    if(data){
      return { result: true }
    }
    return { result: false }
  }


}
