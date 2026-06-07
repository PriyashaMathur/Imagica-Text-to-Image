import React from "react";
import ImageCard from "../Components/imageCard";
import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
const GalleryPage = () => {
  const [images, setimages] = useState([]);
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/image/gallery`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setimages(res.data.images);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGallery();
  }, []);
  return (
    <div className=" flex flex-col min-h-screen flex bg-gradient-to-b from-pink-100 to-yellow-100 gap-10">
      <NavBar/>
      <div className="text-5xl font-bold flex items-center justify-center pt-10">
        Your Creations ✨
      </div>
      <div className="flex flex-wrap items-center pt-10 gap-4 pl-10">
        {images.map((img) => (
          <div key={img._id}>
            <img src={img.imageUrl} className="w-40 h-40" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
