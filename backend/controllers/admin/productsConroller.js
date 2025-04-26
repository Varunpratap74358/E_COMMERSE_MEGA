import { imageUploadUtil } from "../../helpers/cloudinary.js";
import { Product } from "../../models/productsModel.js";

export const handelImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);
    // console.log(result)
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreateProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreateProduct.save();
    res.status(201).json({
      success: true,
      message:"Product added",
      data: newlyCreateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Some internal error",
    });
  }
};

export const fetchAllProducts = async (req, res) => {
  try {
    const listOFProduct = await Product.find()
    res.status(200).json({
        success:true,
        data: listOFProduct
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Some internal error",
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    // 04:06:36
    const {id} = req.params;
    const findProduct = await Product.findById(id)
    if(!findProduct){
        return res.status(404).json({
            success:false,
            message:"Product not found with this id"
        })
    }
    const product = await Product.findByIdAndUpdate(id,req.body,{new:true})

    res.status(201).json({
        success:true,
        message:"Product updated successfully",
        data: product
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Some internal error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id)
    const findProduct = await Product.findById(id)
    // console.log("Product find",findProduct)
    if(!findProduct){
        return res.status(404).json({
            success:false,
            message:"Product not found with this id"
        })
    }
    await Product.findByIdAndDelete(id)
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Some internal error",
    });
  }
};
