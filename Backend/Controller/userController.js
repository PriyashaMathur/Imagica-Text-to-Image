import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.json({
        success: false,
        message: "All Details are required",
      });
    }
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.json({
        success: false,
        message: "User Already exists",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPass,
    });
    await user.save();
    return res.json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "No User Exists",
      });
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      return res.json({
        success: false,
        message: "Wrong Password !!",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.json({
      success: true,
      message: "User logged in successfully!!",
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const profile = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json({
      success: false,
      message: "User doesnot exist",
    });
  }
  const fullName = user.fullName;
  const email = user.email;
  const credits = user.credits;
  const profilePic = user.profilePic;
  return res.json({
    success: true,
    message: "Profile fetched successfully",
    fullName,
    email,
    credits,
    profilePic
  });
};

export const uploadProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const result = await cloudinary.uploader.upload(profilePic);
    await User.findByIdAndUpdate(req.user._id, {
      profilePic: result.secure_url,
    });
    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
