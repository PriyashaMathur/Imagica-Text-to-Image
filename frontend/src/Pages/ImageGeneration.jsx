import React from "react";
import image from "../assets/image4.avif";
import NavBar from "../Components/NavBar";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ImageGeneration = () => {
  const navigate=useNavigate()
  const [prompt, setprompt] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const zeroCredits=()=>{
    toast.error("You have zeroCredits left");
    navigate('/pricing')
  }
  const generateImage = async () => {
    const token = localStorage.getItem("token");
    
    try {
      if(!token){
      toast.error("You need to login first");
      return;
    }
      console.log(prompt);
      if (!prompt.trim()) {
        toast.error("Enter a valid prompt");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/image/generateImage`,
        { prompt },
        {
          headers: {
            token: token,
          },
        },
      );
      if(res.data.message==="No credit Balance"){
        zeroCredits()
      }
      console.log(res.data);
      setimageUrl(res.data.resultImage);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="items-center justify-center bg-gradient-to-b from-pink-100 to-yellow-100 min-h-screen ">
      <NavBar />
      <div className="flex flex-col items-center justify-center mt-20 gap-9">
        <div className="bg-white rounded-4xl overflow-hidden">
          <img src={imageUrl || image} alt="" className="h-65 rounded-4xl object-cover " />
        </div>
        <textarea
          name=""
          id=""
          placeholder="Enter the description"
          className="border h-20 w-70 pl-3"
          value={prompt}
          onChange={(e) => setprompt(e.target.value)}
        ></textarea>
        <div className="flex flex-col gap-4">
          <button
          className="border bg-black text-white w-75 h-10 rounded-3xl"
          onClick={generateImage}
        >
          Generate Image
        </button>
        {imageUrl && <a href={imageUrl} download="imagica.png" className="bg-amber-200 w-50 flex items-center justify-center rounded-3xl ml-13" >
          Download Image
        </a>}
        </div>
        
      </div>
    </div>
  );
};

export default ImageGeneration;
