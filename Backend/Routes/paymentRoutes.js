import express from 'express'
import { createOrder, verifyPayment } from '../Controller/paymentController.js';
import {protectRoute} from "../middlewares/auth.js"
const router=express.Router();
router.post("/create_order",createOrder)
router.post("/verify",protectRoute,verifyPayment)
export default router