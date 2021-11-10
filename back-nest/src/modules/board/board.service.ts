import {Injectable} from '@nestjs/common';
import { BoardDB, BoardDocument } from '../DB/schemas/board/board.schema';
import {CallbackError, Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { boardDTO } from './board.dto';
import paging from '../../config/paging';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(BoardDB.name)
    private boardModel: Model<BoardDocument>
  ) {}

  async getBoard(page: string) {
    const $count = {$count: 'allCount'};
    const [{allCount}] = await this.boardModel.aggregate([
        $count
    ]).exec();

    if(page === undefined){
      page = '1';
    }

    let {
      startPage,
      endPage,
      hidePost,
      maxPost,
      totalPage,
      currentPage
    } = paging(page, allCount);
    console.log(currentPage + ' : ' + endPage + ' : ' + totalPage +' : ' + startPage + ' maxPost');

    const board = await this.boardModel.find({}).sort({"_id": -1}).skip(hidePost).limit(maxPost).exec();

    return {
      board,
      totalPage,
      startPage,
      currentPage
    }
  };

  async insertData(boardData: boardDTO): Promise<BoardDB> {
    const insertBoard = new this.boardModel(boardData);
    return insertBoard.save();
  }

  async getDetailBoard(id: string): Promise<BoardDB>{
    return await this.boardModel.findOne({_id: id}) as boardDTO;
  };

  async updateBoard(id: string,boardDTO): Promise<BoardDB> {
    boardDTO.updated_at = new Date();
    return this.boardModel.findByIdAndUpdate({_id: id},boardDTO);
  };

  async deleteBoardData(id: string) {
    return this.boardModel.deleteOne({_id: id});
  };

}
