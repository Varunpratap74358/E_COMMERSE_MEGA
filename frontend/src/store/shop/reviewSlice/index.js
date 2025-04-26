import { SHOP_API } from "@/api/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";


export const addReview = createAsyncThunk('/review/addReview',async(formData)=>{
    try {
        const {data} = await axios.post(`${SHOP_API}/review/add`,formData)
        toast.success("Review submited successfully")
        return data;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
    }
})

export const getReviews = createAsyncThunk('/review/getReviews',async(productId)=>{
    try {
        // console.log(productId)
        const {data} = await axios.get(`${SHOP_API}/review/${productId}`)
        // console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
    }
})


const initialState={
    isLoading:false,
    reviews:[]
}

const reviewSlice = createSlice({
    name:'reviewSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // add review
        .addCase(addReview.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addReview.fulfilled,(state,action)=>{
            state.isLoading=false
        })
        .addCase(addReview.rejected,(state,action)=>{
            state.isLoading=false
        })
        // get reviews
        .addCase(getReviews.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getReviews.fulfilled,(state,action)=>{
            // console.log(action)
            state.isLoading=false
            state.reviews = action.payload.data
        })
        .addCase(getReviews.rejected,(state,action)=>{
            state.isLoading=false
            state.reviews =[]
        })
    }
})

export default reviewSlice.reducer;