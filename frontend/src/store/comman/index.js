import { FEATURE_API } from "@/api/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/feature/getFeatureImages",
  async () => {
    try {
      const { data } =await axios.get(`${FEATURE_API}/get`);
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFeatureImage = createAsyncThunk(
  "/feature/addFeatureImage",
  async (image) => {
    try {
      const { data } =await axios.post(`${FEATURE_API}/add`, { image });
      toast.success("Image uploaded successfully....");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "internal server error");
    }
  }
);

const commanSlice = createSlice({
  name: "commanSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        // console.log(action)
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commanSlice.reducer;
