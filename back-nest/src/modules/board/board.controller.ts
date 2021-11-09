import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Patch,
  Post,
  Put, Query, Res,
} from '@nestjs/common';
import { boardDTO } from './board.dto';
import { BoardService } from './board.service';


@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get(':page?')
   async getBoard(@Param('page') page: string, @Res() res) {
    console.log('Get Board page : ',page);
    const boardData = await this.boardService.getBoard(page);

    if (!boardData) {
      console.log('게시글이 존재하지 않습니다.');
      return res.status(500).send({msg: 'noData'});
    }
    return res.status(200).send(boardData);
  }

  @Post()
  async insertData(@Body() boardDTO: boardDTO) {
    console.log('Post Board',boardDTO);
    await this.boardService.insertData(boardDTO);
  }

  @Get('/d/:id')
  async getDetailBoard(@Param('id') id: string, @Res() res) {
    // console.log('GET BOARD: ',id);
    const boardData = await this.boardService.getDetailBoard(id);
    // console.log('상세보기',boardData);
    return res.status(200).send({board: boardData});
  }

  @Patch(':id')
  async updateBoard(@Body() boardDTO: boardDTO,
                    @Param('id') id: string) {
    console.log('put!!',boardDTO,id);
    await this.boardService.updateBoard(id,boardDTO);
  }

  @Delete(':id')
  async deleteBoardData(@Param('id') id: string) {
    console.log('delete')
    await this.boardService.deleteBoardData(id);
  }
}
