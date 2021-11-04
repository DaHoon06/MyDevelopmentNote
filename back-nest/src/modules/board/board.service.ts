import { Injectable } from '@nestjs/common';
import { BoardDB, BoardDocument } from '../DB/schemas/board.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { boardDTO } from './board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(BoardDB.name) private boardModel: Model<BoardDocument>,
  ) {}

  async getBoard(): Promise<BoardDB[]> {
    return this.boardModel.find().exec();
  }

  async insertData(boardData: boardDTO): Promise<BoardDB> {
    const insertBoard = new this.boardModel(boardData);
    return insertBoard.save();
  }

  async getDetailBoard(id: string) {}

  async updateBoard(id: string) {}

  deleteBoardData(id: string) {}
}
