import React from 'react'
import image from '../assets/ImagicaImage.png'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const SignupPage = () => {
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const data={
        fullName:e.target.fullName.value,
        email:e.target.email.value,
        password:e.target.password.value
      }
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,data)
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/login')
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
            <div className="border border-4 w-90 flex p-10 h-120 flex-col rounded-3xl ">
              <div className="flex items-center justify-center text-4xl font-bold">SignUp</div>
              <div className="mt-10">
                <form action="" className="flex flex-col items-center justify-center gap-2" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <span>FullName</span>
                    <input
                      type="text"
                      className="border border-black border-2 w-60 rounded-2xl p-1"
                      name='fullName'
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Email-Id</span>
                    <input
                      type="email"
                      className="border border-black border-2 w-60 rounded-2xl p-1"
                      name='email'
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Password</span>
                    <input
                      type="password"
                      className="border border-black border-2 w-60 rounded-2xl p-1"
                      name='password'
                    />
                  </div>
      
                  <button className="border border-black border-2 w-60 mt-10 rounded-2xl text-amber-50 bg-black active:bg-gray-600" type='submit'>SignUp</button>
                </form>
              </div>
            </div>
    </div>
  )
}

export default SignupPage