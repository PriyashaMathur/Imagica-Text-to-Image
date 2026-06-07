import { response } from "express";
import User from "../models/userModel.js";
import FormData from "form-data";
import axios from 'axios'
import Image from "../models/imageModel.js";
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const user = req.user;
    if (!user || !prompt) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }
    if (user.credits === 0 || User.credits < 0) {
      return res.json({
        success: false,
        message: "No credit Balance",
        credits: user.credits,
      });
    }
    const formData = new FormData();
    formData.append("prompt", prompt);
    console.log(process.env.CLIPDROP_API);
    const { data } = await axios.post(
      `https://clipdrop-api.co/text-to-image/v1`,
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      },
    );
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;
    await User.findByIdAndUpdate(user._id, { credits: user.credits - 1 });
    await Image.create({
      userId:req.user._id,
      prompt,
      imageUrl:resultImage
    })
    res.json({
      success: true,
      message: "Image generated",
      credits: user.credits - 1,
      resultImage,
    });
  } catch (error) {
    console.log("STATUS =>", error.response?.status);
    console.log("DATA =>", error.response?.data?.toString());
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getGallery=async(req,res)=>{
  try{
    const images=await Image.find({
      userId:req.user._id,
    }).sort({createdAt:-1});
    console.log(images)
    res.json({
      success:true,
      images,
    })
  }
  catch(error){
    res.json({
      success:false,
      message:error.message
    });
  }
}