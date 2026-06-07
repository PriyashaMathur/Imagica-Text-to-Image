import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Database/db.js'
import userRouter from './Routes/userRouter.js';
import cors from 'cors'
import imageRouter from './Routes/imageRoutes.js';
import router from './Routes/paymentRoutes.js';
dotenv.config();
const app=express()
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use('/api/users',userRouter)
app.use('/api/image',imageRouter)
app.use('/api/payment',router)
connectDB();
app.listen(5000,()=>{
  console.log('Server is running')
})