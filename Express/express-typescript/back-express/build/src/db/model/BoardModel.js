"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var auto = require('mongoose-auto-increment');
auto.initialize(mongoose_1.default.connection);
/*
* model은 데이터베이스에서 데이터를 읽고, 생성하고, 수정하는프로그래밍 인터페이스를 정의
*/
var schema = mongoose_1.default.Schema;
var boardSchema = new schema({
    seq: {
        type: Number, default: 0
    },
    board_title: String,
    board_content: String,
    board_writer: String,
    created_at: Date,
    updated_at: Date
});
boardSchema.plugin(auto.plugin, {
    model: 'Board',
    field: 'seq',
    startAt: 1,
    increment: 1
});
var Board = mongoose_1.default.model('Board', boardSchema);
exports.Board = Board;
//# sourceMappingURL=BoardModel.js.map