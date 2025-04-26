import { Order } from "../../models/orderModel.js";
import { Product } from "../../models/productsModel.js";
import { ProductReview } from "../../models/review.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });
    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product review it.",
      });
    }
    const checkExistingReview = await Product.findOne({ productId, userId });
    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewd this product!",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save(); 

    const review = await ProductReview.find({productId})
    const totalReviewLength = review.length;
    const averageReview = review.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/totalReviewLength;

    await Product.findByIdAndUpdate(productId,{averageReview})

    res.status(201).json({
        success:true,
        data: newReview
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};

export const getProductReview = async (req, res) => {
  try {
    const {productId} = req.params;
    const reviews = await ProductReview.find({productId})
    res.status(200).json({
        success:true,
        data: reviews
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};
