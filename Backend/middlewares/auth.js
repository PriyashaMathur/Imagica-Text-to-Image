import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
export const protectRoute=async(req,res,next)=>{
  try{
    const token=req.headers.token;
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    const user=await User.findById(decoded.id).select("-password");
    if(!user){
      return res.json({
        success:false,
        message:"User not found"
      });
    }
    req.user=user
    next()
  }
  catch(error){
    res.json({
      success:false,
      message:error.message
    })
  }
}
