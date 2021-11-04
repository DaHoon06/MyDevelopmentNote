"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var schema = mongoose_1.default.Schema;
var commentSchema = new schema({
    board_id: String,
    comment_content: String,
    comment_writer: String,
    created_at: Date,
    updated_at: Date,
});
var Comment = mongoose_1.default.model('Comment', commentSchema);
exports.Comment = Comment;
//# sourceMappingURL=CommentModel.js.map