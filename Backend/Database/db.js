import mongoose from 'mongoose'
async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected successfully!!")
  }
  catch(error){
    console.log("Some  issue in connecting to database"+error)
  }
}
export default connectDB