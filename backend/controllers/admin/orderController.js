import { Order } from "../../models/orderModel.js";

export const getAllOrdersOfAdmin = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};

export const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
    }

    await Order.findByIdAndUpdate(id,{orderStatus},{new:true})
    res.status(200).json({
        success:true,
        message:"Order status is updated..."
        
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};
