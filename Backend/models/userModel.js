import mongoose from "mongoose";
import { type } from "node:os";
const userSchema=new mongoose.Schema({
  fullName:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    trim:true
  },
  credits:{
    type:Number,
    default:5
  },
  profilePic:{
    type:String,
    default:""
  },
})
const User=mongoose.model("User",userSchema)
export default User