import mongoose from 'mongoose';
// import todo from './todo.model.js';
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    list:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"todo"
    }]

},{timestamps:true});
const User = mongoose.model('User', userSchema);
export default User;