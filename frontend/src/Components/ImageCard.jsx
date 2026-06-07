import React from 'react'
const ImageCard = (props) => {
  return (
    <div>
      <img src={props.url} className="w-full h-60 object-cover p-3 rounded-4xl"/>
    </div>
  )
}

export default ImageCard