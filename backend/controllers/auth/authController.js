import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "user already registered with this email",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Some errir occured",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered with this email",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Entered password is wrong",
      });
    }
    const token = await jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName:user.userName
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res
      .status(200)
      .cookie("token", token, { httpOnly: true, sucure: false })
      .json({
        success: true,
        message: "User login successfully...",
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
          userName:user.userName
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Some errir occured",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).clearCookie("token").json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Some errir occured",
    });
  }
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user)
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Some errir occured",
    });
  }
};
