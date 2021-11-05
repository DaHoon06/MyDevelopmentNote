import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Res,
} from '@nestjs/common';
import { boardDTO } from './board.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/:page?')
  async getBoard(@Param('page')page: string, @Res() res) {
    console.log('Get Board page : ',page);
    const boardData = await this.boardService.getBoard(page);

    if (boardData === undefined) {
      console.log('게시글이 존재하지 않습니다.');
      return res.status(500).send({msg: 'noData'});
    }
    console.log(boardData+' :::::');
    return res.status(200).send({board: boardData});
  }

  @Post()
  async insertData(@Body() boardDTO: boardDTO, @Res() res) {
    console.log('Post Board',boardDTO);
    await this.boardService.insertData(boardDTO);
  }

  @Get('d/:id')
  async getDetailBoard(@Param('id') id: string) {
    console.log('GET BOARD : ',id);
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
