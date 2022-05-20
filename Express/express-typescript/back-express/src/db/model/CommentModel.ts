import mongoose from 'mongoose';

const schema = mongoose.Schema;

const commentSchema = new schema({
   board_id: String,
   comment_content: String,
   comment_writer: String,
   created_at: {type: Date, default: new Date()},
   updated_at: {type: Date, default: new Date()},
});

const Comment = mongoose.model('Comment',commentSchema);

export {Comment}