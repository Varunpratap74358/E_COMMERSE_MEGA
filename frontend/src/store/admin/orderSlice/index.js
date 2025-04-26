import { ADMIN_API } from "@/api/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    try {
      const { data } = await axios.get(`${ADMIN_API}/order/get`);
      // console.log(data)
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Interner server error");
      console.log(error);
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    try {
      const { data } = await axios.get(`${ADMIN_API}/order/details/${id}`);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Interner server error");
      console.log(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    try {
      const { data } = await axios.put(`${ADMIN_API}/order/update/${id}`, {
        orderStatus,
      });
      toast.success(data?.message || "Updated");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Interner server error");
      console.log(error);
    }
  }
);

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //get all orders
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action?.payload?.data;
        // console.log(state.orderList)
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
      })
      //get order details

      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action?.payload?.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
