import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth/authRoute.js";
import adminProductsRouter from "./routes/admin/productsRoute.js";
import shopRouter from "./routes/shop/productRoute.js";
import shopCartRouter from "./routes/shop/cartRoutes.js";
import shopAddressRouter from './routes/shop/addressRoute.js'
import shopOrderRouter from './routes/shop/orderRoute.js'
import adminOrderRouter from './routes/admin/orderRoute.js'
import shopSearchRouter from './routes/shop/searchRoutes.js'
import shopReviewRouter from './routes/shop/reviewRoutes.js'
import featureRouter from './routes/comman/featuresRoute.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({extends:true}))
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo db Connected");
  })
  .catch((err) => {
    console.log("Error in mongo db connection : " + err);
  });

//routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/order", adminOrderRouter);

app.use("/api/shop/products", shopRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use('/api/shop/review',shopReviewRouter)
app.use('/api/comman/feature',featureRouter)


app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
