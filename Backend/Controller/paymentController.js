import { razorpayInstance } from "../config/razorpay.js";
import crypto from "crypto"
import User from "../models/userModel.js"
export const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    let amount;
    switch (planId) {
      case "Basic":
        amount = 20 * 100;
        break;

      case "Advanced":
        amount = 50 * 100;
        break;

      case "Business":
        amount = 70 * 100;
        break;
    }
    const options = {
      amount,
      currency: "INR",
      receipt: `receipt${Date.now()}`,
    };
    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment=async(req,res)=>{
  try{
    const{razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId
    }=req.body;

    const generatedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET).update(razorpay_order_id + "|"+razorpay_payment_id).digest("hex");

    if(generatedSignature!==razorpay_signature){
      return res.status(400).json({
        success:false,
        message:"Payment Verification failed"
      });
    }
    // credits add karo
    let credits=0;
    if(planId==="Basic"){
      credits=1
    }
    else if(planId==="Premium"){
      credits=3
    }
    else{
      credits=5
    }
    await User.findByIdAndUpdate(req.user._id,{
      $inc:{credits}
    });
    res.json({
      success:true,
      message:"Payment Verified"
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
}