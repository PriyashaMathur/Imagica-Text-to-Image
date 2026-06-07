import React from "react";
import image from '../assets/ImagicaImage.png'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const LoginPage = () => {
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const data={
      email:e.target.email.value,
      password:e.target.password.value
    }
    try{
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,data);
      localStorage.setItem("token",res.data.token)
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/');
      }
      else{
        toast.error(res.data.message)
      }
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-yellow-200 gap-10">
      <div className="h-50 w-50 rounded-4xl">
        <img src={image} alt="" className="rounded-full" onClick={()=>{
          navigate('/')
        }}/>
      </div>
      <div className="border border-4 w-90 flex p-10 h-100 flex-col rounded-3xl ">
        <div className="flex items-center justify-center text-4xl font-bold">Login</div>
        <div className="mt-10">
          <form action="" className="flex flex-col items-center justify-center gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <span>Email-Id</span>
              <input
                type="email"
                className="border border-black border-2 w-60 rounded-2xl p-1" name="email"
              />
            </div>
            <div className="flex flex-col">
              <span>Password</span>
              <input
                type="password"
                className="border border-black border-2 w-60 rounded-2xl p-1" name="password"
              />
            </div>

            <button className="border border-black border-2 w-60 mt-10 rounded-2xl text-amber-50 bg-black active:bg-gray-600" type="submit">LogIn</button>
          </form>

        </div>
        <div className="flex mt-7 ml-6 gap-2">
          <div>Don't have an account?  </div>
          <button className="text-pink-700 cursor-pointer " onClick={()=>{
           navigate('/signup') 
          }
          } >  Signup</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
