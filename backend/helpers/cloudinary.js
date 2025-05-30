import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config({});

cloudinary.config({
  cloud_name: process.env.COUDINARY_CLOUD_NAME,
  api_key: process.env.COUDINARY_API_KEY,
  api_secret: process.env.COUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();

export const imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

export const upload = multer({storage})

