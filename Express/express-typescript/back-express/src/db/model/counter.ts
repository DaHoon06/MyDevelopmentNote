import * as mongoose from "mongoose";

const schema = mongoose.Schema;

const counter = new schema({
    name: {
        type:String, required:  true
    },
    count: {
        type: Number, default: 0
    }
});

let Counter = mongoose.model('counter',counter);

export {Counter}