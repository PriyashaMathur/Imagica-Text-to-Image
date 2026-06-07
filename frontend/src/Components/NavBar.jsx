import React from 'react'
import image from '../assets/ImagicaImage.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

import axios from 'axios'
const NavBar = () => {
  const [tokenPresent, settokenPresent] = useState(true)
  const [credits, setcredits] = useState(0)
  const navigate=useNavigate()
  const gettokens=async()=>{
    const token=localStorage.getItem("token")
    if(!token){
      settokenPresent(false)
    }
    try{
      const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,{
        headers:{
          token:token
        }
      })
      setcredits(res.data.credits)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    gettokens()
  },[])
  return (
    <div className='h-20 items-center flex justify-between w-full pl-14 pr-14'>
      <div className='flex flex-col items-center justify-center'  onClick={()=>{
          navigate('/')}
        }>
        <img src={image} alt="" className='h-25 ml-19 mt-19 rounded-full border'  />
        <h2 className='text-2xl font-black pl-18'>Imagica</h2>
      </div>
      <div className='flex gap-10'>
        <button className='h-7 w-23 rounded-2xl bg-black text-white text-l font-medium active:bg-gray-700 transition-all' onClick={()=>{
          navigate('/pricing')}
        }>Pricing</button>
        {!tokenPresent && <button className='border h-7 w-23 rounded-2xl bg-black text-white text-l font-medium active:bg-gray-700 transition-all' onClick={()=>{
          navigate('/login')}
        }>Login</button>}
        <button className='border h-7 w-23 rounded-2xl bg-black text-white text-l font-medium active:bg-gray-700 transition-all'
        onClick={()=>{
          navigate('/profile')}
        }>Profile</button>
        <span className='border h-7 w-33 rounded-2xl bg-black text-white text-l font-medium pl-2 active:bg-gray-700 transition-all'>No. of credits : {credits}</span>
        {tokenPresent && <button className='border h-7 w-23 rounded-2xl bg-black text-white text-l font-medium active:bg-gray-700 transition-all' onClick={()=>{
          navigate('/gallery')}
        }>Gallery</button>}
      </div>
    </div>
  )
}

export default NavBar