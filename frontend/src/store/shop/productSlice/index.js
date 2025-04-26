import { SHOP_API } from "@/api/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllFilderedProduct = createAsyncThunk(
  "product/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    try {
      const { data } = await axios.get(`${SHOP_API}/products/get?${query}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductsDetail",
  async (id) => {
    try {
      const { data } = await axios.get(`${SHOP_API}/products/get/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails:(state,action)=>{
      state.productDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // get all products
      .addCase(fetchAllFilderedProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilderedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchAllFilderedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })

      // get product detail
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action?.payload?.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = null;
      });
  },
});

export const {setProductDetails} = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
