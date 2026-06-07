import express from 'express'
import { login, profile, signup, uploadProfilePic } from '../Controller/userController.js'
import { protectRoute } from '../middlewares/auth.js'
import { upload } from '../middlewares/multer.js'
const userRouter=express.Router()
userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.get('/profile',protectRoute,profile)
userRouter.post('/upload_profile',protectRoute,upload.single("image"),uploadProfilePic)
export default userRouter