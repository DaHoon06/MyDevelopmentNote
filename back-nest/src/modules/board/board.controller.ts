import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { boardDTO } from './board.dto';
import { BoardService } from './board.service';
import { response } from 'express';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async getBoard() {
    console.log('Get Board');
    const res = await this.boardService.getBoard();
    console.log(res);
    if (res === null) {
      console.log('게시글이 존재하지 않습니다.');
      response.json({
        msg: 'noData',
      });
    }
    response.json({
      msg: 'noData',
    });
  }

  @Post()
  async insertData(@Body() boardDTO: boardDTO) {
    console.log('Post Board');
    await this.boardService.insertData(boardDTO);
  }

  @Get(':id')
  async getDetailBoard(@Param('id') id: string) {
    await this.boardService.getDetailBoard(id);
  }

  @Put(':id')
  async updateBoard(@Param('id') id: string) {
    await this.boardService.updateBoard(id);
  }

  @Delete(':id')
  async deleteBoardData(@Param('id') id: string) {
    await this.boardService.deleteBoardData(id);
  }
}
