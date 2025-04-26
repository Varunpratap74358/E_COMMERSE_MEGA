import { SHOP_API } from "@/api/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    // console.log(userId, productId, quantity)
    try {
      const { data } = await axios.post(`${SHOP_API}/cart/add`,{userId, productId, quantity});
    //   console.log(data)
    toast.success('Item is added to cart!')
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error")
    }
  }
);


export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (userId) => {
      try {
        const { data } = await axios.get(`${SHOP_API}/cart/get/${userId}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );


  export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartIte",
    async ({ userId, productId }) => {
      try {
        const { data } = await axios.delete(`${SHOP_API}/cart/${userId}/${productId}`);
        toast.success("Item deleted from the cart!")
        return data;
      } catch (error) {
        toast.error(error?.response?.data?.message || "Internal server error")
        console.log(error);
      }
    }
  );



  export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
      try {
        const { data } = await axios.put(`${SHOP_API}/cart/update-cart`,{userId, productId, quantity});
        toast.success('Cart item updated successfully')
        return data;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal server error")
      }
    }
  );

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // add to cart
    .addCase(addToCart.pending,(state,action)=>{
        state.isLoading = true;
    })
    .addCase(addToCart.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.cartItems = action?.payload?.data;
    })
    .addCase(addToCart.rejected,(state,action)=>{
        state.isLoading = false;
        state.cartItems=[]
    })

    // fetch cart items
    .addCase(fetchCartItems.pending,(state,action)=>{
        state.isLoading = true;
    })
    .addCase(fetchCartItems.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.cartItems = action.payload.data;
    })
    .addCase(fetchCartItems.rejected,(state,action)=>{
        state.isLoading = false;
        state.cartItems=[]
    })

    // update cart
    .addCase(updateCartQuantity.pending,(state,action)=>{
        state.isLoading = true;
    })
    .addCase(updateCartQuantity.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.cartItems = action.payload.data;
    })
    .addCase(updateCartQuantity.rejected,(state,action)=>{
        state.isLoading = false;
        state.cartItems=[]
    })

    // delete cart 
    .addCase(deleteCartItem.pending,(state,action)=>{
        state.isLoading = true;
    })
    .addCase(deleteCartItem.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.cartItems = action.payload.data;
    })
    .addCase(deleteCartItem.rejected,(state,action)=>{
        state.isLoading = false;
        state.cartItems=[]
    })
  },
});

export default shoppingCartSlice.reducer;
