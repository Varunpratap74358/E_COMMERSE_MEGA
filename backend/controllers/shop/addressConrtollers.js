import { Address } from "../../models/addressModel.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const data = await Address.create({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId)
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }
    const addressList = await Address.find({userId});
    // console.log(addressList)
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }
    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      req.body,
      { new: true }
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Updated successfully",
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }
    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    return res.status(200).json({
      message: "Address Deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
