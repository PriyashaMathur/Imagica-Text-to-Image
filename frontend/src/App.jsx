import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import Profile from './Pages/Profile'
import HomePage from './Pages/HomePage'
import Pricing from './Pages/Pricing'
import ImageGeneration from './Pages/ImageGeneration'
import GalleryPage from './Pages/GalleryPage'
const App = () => {
  return (
    <Routes> 
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/pricing' element={<Pricing/>}/> 
      <Route path='/imagegeneration' element={<ImageGeneration/>}/>      
      <Route path='/gallery' element={<GalleryPage/>}/>    
    </Routes>
  )
}

export default App