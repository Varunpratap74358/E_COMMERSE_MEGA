import { ADMIN_API } from "@/api/API";
import axios from "axios";
import { toast } from "sonner";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


const initialState = {
  isLoading: false,
  productsList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    try {
      const { data } = await axios.post(`${ADMIN_API}/products/add`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    //   console.log(data)
      toast.success(data?.message);
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Some internal error");
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/addnewproduct",
  async () => {
    try {
      const { data } = await axios.get(`${ADMIN_API}/products/get`);
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Some internal error");
    }
  }
);

export const editProduct = createAsyncThunk(
  "/products/addnewproduct",
  async ({ id, formData }) => {
    try {
      const { data } = await axios.put(
        `${ADMIN_API}/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data?.message);
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Some internal error");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (id) => {
    try {
      const { data } = await axios.delete(`${ADMIN_API}/products/delete/${id}`);
      toast.success(data?.message);
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Some internal error");
    }
  }
);

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // fetchall products
    .addCase(fetchAllProducts.pending, (state,action) => {
        state.isLoading=true
    })
    .addCase(fetchAllProducts.fulfilled, (state,action) => {
        state.isLoading=false;
        state.productsList=action?.payload?.data;
    })
    .addCase(fetchAllProducts.rejected, (state,action) => {
        state.isLoading=true
        state.productsList=[]
    })
  },
});


export default AdminProductSlice.reducer