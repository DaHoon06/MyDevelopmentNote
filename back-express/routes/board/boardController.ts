import express from "express";
import { Board } from '../../src/db/model/BoardModel';
import {CallbackError} from "mongoose";
import {IBoard} from "../../src/db/model/IBoard";
import paging from "./paging";
import commentController from "./commentController";
const boardController : express.Application = express();

//답변
boardController.use('/comment',commentController);

//GET
boardController.get('/:page?',async(req, res) => {
   console.log('Board GET !!!');

   const page = req.query;
   console.log(page + ' : PAGE');
   const $count = {$count:"allCount"}

   if(page === undefined){
      page : 1;
   }
   const [{allCount}] = await Board.aggregate([
       $count
   ]).exec();

   let {
      startPage,
      endPage,
      hidePost,
      maxPost,
      totalPage,
      currentPage
   } = paging(page, allCount);

  console.log(currentPage + ' : ' + endPage + ' : ' + totalPage +' : ' + startPage + ' maxPost');

   Board.find(((err: CallbackError, boards: IBoard) => {
      if(err){
         return res.status(500).send({err: 'DB Failure'});
      }
      res.json({
         board : boards,
         totalPage : totalPage,
         startPage : startPage,
         currentPage : currentPage,
      });
   })).sort({"_id": -1}).skip(hidePost).limit(maxPost)
});


//DETAIL
boardController.get('/b/:id',(req, res) => {

   console.log('Board GET :ID !!!'+req.params.id);

   Board.findOne({_id: req.params.id}, (err: CallbackError, boards: IBoard) => {
      if(err){return res.status(500).json({err: err})}
      if(!boards){return res.status(404).json({err: 'board not found...'})}
      console.log(boards);
      res.json({
         board : boards,
      });

   })
});


//INSERT
boardController.post('/',(req, res) => {
   console.log('Board POST !!!');
   console.log(req.body);
   let body = req.body;

   const insertBoard = new Board();
      insertBoard.board_title = body.board_title;
      insertBoard.board_content = body.board_content;
      insertBoard.board_writer = '전다훈';
      insertBoard.created_at = new Date();
      insertBoard.updated_at = new Date();

   insertBoard.save((err:CallbackError) => {
      if (err) {
         console.log('작성 실패..' + err);
         res.json({result: 0});
         return;
      }
      res.json({result: 1});
   })
});

//UPDATE
boardController.put('/:id',((req, res) => {

   Board.findById(req.params.id,function(err:CallbackError,boards:any){
      let body = req.body;
      console.log('Board PUT !!!');
      if(err){return res.status(500).json({err: 'database failure'})}
      if(!boards){return res.status(404).json({err:'board not found...'})}

      boards.board_title = body.board_title;
      boards.board_content = body.board_content;
      boards.updated_at = new Date();

      boards.save((err:CallbackError) => {
         if(err){return res.status(500).json({err: 'failed to update...'})}
         res.json({result : 1})
      })
   })
}))

//DELETE
boardController.delete('/:id',(req, res) => {
   Board.remove({_id : req.params.id},(err:CallbackError) => {
      if(err){return res.status(500).json({err : 'DELETE FAILED...'})}
      res.status(204).end();
   })
});


boardController.get('/search/:keyword',(req, res) => {
   console.log('검색 중....',req.params.keyword);

   Board.find({
      board_title: req.params.keyword
   },(err: CallbackError,boards: IBoard) => {
      if(err){
         return res.status(500).send({err : 'DB Failure'});
      }
      console.log(boards);
      res.json({
         board: boards,
         data: req.params.keyword,
      });

   })
});

export default boardController;