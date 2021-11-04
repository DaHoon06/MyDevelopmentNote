import mongoose from 'mongoose';

const schema = mongoose.Schema;

const commentSchema = new schema({
   board_id: String,
   comment_content: String,
   comment_writer: String,
   created_at: Date,
   updated_at: Date,
});

const Comment = mongoose.model('Comment',commentSchema);

export {Comment}