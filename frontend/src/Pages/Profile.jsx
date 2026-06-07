import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import defaultImage from "../assets/userImage.avif";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
  const [email, setemail] = useState("");
  const [fullName, setfullName] = useState("");
  const navigate = useNavigate();
  const [profilePic, setprofilePic] = useState("");
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/upload_profile`,
          {
            profilePic: base64Image,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          },
        );
        if (res.data.success) {
          setprofilePic(res.data.imageUrl);
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  const handleProfile = async (e) => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setemail(res.data.email);
        setfullName(res.data.fullName);
        setprofilePic(res.data.profilePic);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleProfile();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center  bg-gradient-to-b from-pink-200 to-yellow-200 gap-10">
      <NavBar />
      <div className="border border-4 w-90 flex p-10 h-120 flex-col rounded-3xl gap-10 mt-10">
        <div className="flex flex-col">
          <img
            src={profilePic || defaultImage}
            alt="preview"
            className="flex items-center justify-center h-30 w-30 border border-1 ml-20 rounded-full"
             onError={() => console.log("IMAGE FAILED")}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name=""
            id=""
            className="flex ml-10"
          />
        </div>
        <form
          action=""
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="flex flex-col">
            <span>FullName:</span>
            <input
              type="text"
              className="border border-black border-2 w-60 rounded-2xl p-1 font-medium"
              readOnly
              value={fullName}
            />
          </div>
          <div className="flex flex-col">
            <span>Email-Id</span>
            <input
              type="email"
              className="border border-black border-2 w-60 rounded-2xl p-1 font-medium"
              readOnly
              value={email}
            />
          </div>
        </form>
        <button
          className="border h-9 w-20 ml-50 mt-7 bg-red-500 text-white border-black border-2 rounded-2xl active:bg-red"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
