import React from "react";
import image from "../assets/image.jpg";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.webp";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.avif";
import image5 from "../assets/image5.jpg";
const CenterContent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center ml-20 mb-10">
      <div className="flex flex-col items-center justify-center mt-15 gap-2">
        <p className="text-7xl font-bold">Turn text to image,</p>
        <p className="text-7xl font-bold">in seconds</p>
      </div>
      <div
        className="flex flex-col items-center justify-center border w-75 h-15 rounded-3xl text-2xl font-bold text-white bg-black mt-17 active:bg-gray-700 transition-all"
        onClick={() => {
          navigate("/imagegeneration");
        }}
      >
        {" "}
        GENERATE IMAGE
      </div>
      <div className="flex gap-2 mt-11">
        <img src={image} alt="" className="h-20 rounded-3xl" />
        <img src={image1} alt="" className="h-20 rounded-3xl" />
        <img src={image2} alt="" className="h-20 rounded-3xl" />
        <img src={image3} alt="" className="h-20 rounded-3xl" />
        <img src={image4} alt="" className="h-20 rounded-3xl" />
        <img src={image5} alt="" className="h-20 rounded-3xl" />
        <img src={image1} alt="" className="h-20 rounded-3xl" />
      </div>
      <div className="flex gap-5 justify-center  ml-22 mt-29 gap-10">
        <div>
          <img src={image3} alt="" className="h-100 rounded-3xl" />
        </div>
        <div className="flex flex-col mt-15 gap-5">
          <div className="text-3xl font-medium ">
            Introducing AI-Powered text to image generator
          </div>
          <div className="text-l font-medium mt-5">
            Turn simple text prompts into breathtaking visuals in seconds.
            Whether you're designing <br /> 
            social media content, creating concept art,
            generating marketing assets, or exploring your creativity, our
            AI-powered image generator <br /> brings your imagination to life.Create
            photorealistic scenes, digital illustrations, anime artwork, fantasy<br /> 
            worlds, and much more with just a few words. No design skills
            required—just describe what you want, and let AI handle the rest.
            <br /> ✨ Generate high-quality images instantly <br />🎨 Multiple
            artistic styles and themes <br />⚡ Fast, simple, and user-friendly
            experience <br />🚀 Perfect for creators, students, and professionals
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterContent;
