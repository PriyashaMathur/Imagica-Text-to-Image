import React from 'react'
import image from '../assets/ImagicaImage.png'
import PriceCard from '../Components/PriceCard'
import Pricing from './Pricing'
import NavBar from '../Components/NavBar'
import CenterContent from '../Components/CenterContent'
import ImageGeneration from './ImageGeneration'
import GalleryPage from './GalleryPage'
const HomePage = () => {
  return (
    <div  className=" flex flex-col min-h-screen flex bg-gradient-to-b from-pink-100 to-yellow-100 gap-10">
      <NavBar/>
      <CenterContent/>
    </div>
  )
}

export default HomePage