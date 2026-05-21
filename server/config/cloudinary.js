import {v2 as cloudinary} from 'cloudinary';
import "dotenv/config"
import fs from 'fs';

    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })

    const uploadOnCloudinary = async (filepath)=>{
        try {
            if(!filepath) return null;
            const response = await cloudinary.uploader.upload(filepath,{
                resource_type: "auto"
            });
            fs.unlinkSync(filepath)
            return response;
        } catch (error) {
            fs.unlinkSync(filepath);
            return null;
        }
    }

export { uploadOnCloudinary };