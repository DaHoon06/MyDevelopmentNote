import mongoose from 'mongoose';

const schema = mongoose.Schema;

const userSchema = new schema({
    email : String,
    pw : String,
    name : String,
});

const User = mongoose.model('User',userSchema);

export {User}