import express from 'express'
import {generateImage, getGallery} from '../Controller/imageController.js'
import { protectRoute } from '../middlewares/auth.js';

const imageRouter=express.Router();
imageRouter.post('/generateImage',protectRoute,generateImage)
imageRouter.get('/gallery',protectRoute,getGallery)

export default imageRouter 