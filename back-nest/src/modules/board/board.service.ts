import {Injectable} from '@nestjs/common';
import { BoardDB, BoardDocument } from '../DB/schemas/board.schema';
import {CallbackError, Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { boardDTO } from './board.dto';
import paging from '../../config/paging';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(BoardDB.name)
    private boardModel: Model<BoardDocument>) {}

  // async getBoard(page: string) {
  //   const $count = {$count: 'allCount'}
  //   const [{allCount}] = await this.boardModel.aggregate([
  //       $count
  //   ]).exec();
  //
  //   if(page === undefined){
  //     page = '1';
  //   }
  //
  //   let {
  //     startPage,
  //     endPage,
  //     hidePost,
  //     maxPost,
  //     totalPage,
  //     currentPage
  //   } = paging(page, allCount);
  //   console.log(currentPage + ' : ' + endPage + ' : ' + totalPage +' : ' + startPage + ' maxPost');
  //
  //   this.boardModel.find((err: CallbackError, boardData: boardDTO) => {
  //     //console.log(boardData);
  //     // return {
  //     //   board: boardData,
  //     //   totalPage: totalPage,
  //     //   startPage: startPage,
  //     //   currentPage: currentPage,
  //     // };
  //     return{
  //       board: boardData
  //     };
  //   }).sort({"_id": -1}).skip(hidePost).limit(maxPost);
  // };
  async getBoard(): Promise<BoardDB[]> {
    return this.boardModel.find().exec();
  }

  async insertData(boardData: boardDTO): Promise<BoardDB> {
    boardData.created_at = new Date();
    boardData.updated_at = new Date();
    boardData.writer = '다훈';

    const insertBoard = new this.boardModel(boardData);
    return insertBoard.save();
  }

  async getDetailBoard(id: string){
    this.boardModel.findOne({_id: id},(err: CallbackError, boardData: boardDTO) => {
      console.log(boardData);
      return boardData;
    })
  };

  async updateBoard(id: string,boardDTO) {
    this.boardModel.findOne({_id: id},(err, boardData) => {
      boardData.title = boardDTO.title;
      boardData.content = boardDTO.content;
      boardData.updated_at = new Date();
      return boardData.save();
    });
  };

  async deleteBoardData(id: string) {
    this.boardModel.remove({_id: id},(err) => {
      if(err){return }
      return '';
    })
  };
}
