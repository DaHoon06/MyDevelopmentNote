import mongoose from 'mongoose';
let auto = require('mongoose-auto-increment');
auto.initialize(mongoose.connection);
/*
* model은 데이터베이스에서 데이터를 읽고, 생성하고, 수정하는프로그래밍 인터페이스를 정의
*/

const schema = mongoose.Schema;

const boardSchema = new schema({
    seq: {
        type: Number, default: 0
    },
    board_title: String,
    board_content: String,
    board_writer: String,
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()},
})

boardSchema.plugin(auto.plugin,{
    model: 'Board',
    field: 'seq',
    startAt: 1,
    increment: 1
});

const Board = mongoose.model('Board',boardSchema);

export { Board }
