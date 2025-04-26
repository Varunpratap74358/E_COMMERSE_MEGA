import { SHOP_API } from "@/api/API";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";


const initialState = {
    isLoading : false,
    searchResults:[]
}


export const getSearchResult = createAsyncThunk("/search/getSearchResult",async(keyword)=>{
    try {
        const {data} = await axios.get(`${SHOP_API}/search/${keyword}`)
        return data;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || 'Internal server error')
    }
})


const searchSlice = createSlice({
    name:'searchSlice',
    initialState,
    reducers:{
        resetSearchResult:(state)=>{
            state.searchResults = []
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getSearchResult.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(getSearchResult.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.searchResults = action.payload.data
        })
        .addCase(getSearchResult.rejected,(state,action)=>{
            state.isLoading = false
            state.searchResults =[]
        })
    }
})
export const {resetSearchResult} = searchSlice.actions
export default searchSlice.reducer