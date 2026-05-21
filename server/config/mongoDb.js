import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected Sucessfully!")
    } catch (error) {
        console.log("the error in connecting Db is ",error)
        process.exit(1)
    }
}

export default connectDB;