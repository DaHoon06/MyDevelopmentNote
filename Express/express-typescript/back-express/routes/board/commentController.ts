import express from "express";
import {Comment} from "../../src/db/model/CommentModel";
import {CallbackError} from "mongoose";

const commentController : express.Application = express();

commentController.get('/b/:id',(req, res) => {
    console.log('답변 확인');

    Comment.find({board_id: req.params.id},(err,comments) => {
        if(err){
            return res.status(500).send({err : 'DB Failure'});
        }
        res.json({
            comment: comments
        })
    })
});

commentController.post('/',(req, res) => {
    console.log('COMMENTS TEST',req.body);
    const insertComment = new Comment();
    insertComment.board_id = req.body.board_id;
    insertComment.comment_content = req.body.comment_content;
    insertComment.comment_writer = '다훈';
    insertComment.created_at = new Date();
    insertComment.updated_at = new Date();

    insertComment.save((err: CallbackError) => {
        if(err){
            console.log(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    })

});

export default commentController;