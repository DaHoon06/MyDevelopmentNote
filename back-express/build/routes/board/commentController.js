"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CommentModel_1 = require("../../src/db/model/CommentModel");
var commentController = (0, express_1.default)();
commentController.get('/b/:id', function (req, res) {
    console.log('답변 확인');
    CommentModel_1.Comment.find({ board_id: req.params.id }, function (err, comments) {
        if (err) {
            return res.status(500).send({ err: 'DB Failure' });
        }
        res.json({
            comment: comments
        });
    });
});
commentController.post('/', function (req, res) {
    console.log('COMMENTS TEST', req.body);
    var insertComment = new CommentModel_1.Comment();
    insertComment.board_id = req.body.board_id;
    insertComment.comment_content = req.body.comment_content;
    insertComment.comment_writer = '다훈';
    insertComment.created_at = new Date();
    insertComment.updated_at = new Date();
    insertComment.save(function (err) {
        if (err) {
            console.log(err);
            res.json({ result: 0 });
            return;
        }
        res.json({ result: 1 });
    });
});
exports.default = commentController;
//# sourceMappingURL=commentController.js.map