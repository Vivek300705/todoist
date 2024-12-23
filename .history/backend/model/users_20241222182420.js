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
    todo:
      [{type: mongoose.Schema.Types.ObjectId, // Reference to a single user
      ref: "todo", // Referencing the User model
      required: true,}]

},{timestamps:true});
const User = mongoose.model('User', userSchema);
export default User;