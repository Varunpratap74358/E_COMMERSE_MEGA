import mongoose from "mongoose";


const featuresSchema = new mongoose.Schema({
    image:String
},{timestamps:true})

export const Feature = mongoose.model('Feature',featuresSchema)