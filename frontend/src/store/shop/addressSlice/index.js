import { SHOP_API } from "@/api/API"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "sonner"


const initialState={
    isLoading:false,
    addressList:[]
}

export const addNewAddress =createAsyncThunk('/addresses/addNewAddress',async(formData)=>{
    try {
        const {data} = await axios.post(`${SHOP_API}/address/add`,formData)
        toast.success("Address added successfully....")
        return data;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || 'internal server error')
    }
})

export const fetchAllAddress =createAsyncThunk('/addresses/fetchAllAddress',async(userId)=>{
    try {
        const {data} = await axios.get(`${SHOP_API}/address/get/${userId}`)
        // console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || 'internal server error')
    }
})

export const editaAddress =createAsyncThunk('/addresses/editaAddress',async({userId,addressId,formData})=>{
    try {
        const {data} = await axios.put(`${SHOP_API}/address/update/${userId}/${addressId}`,formData)
        toast.success("Address edit successfully....")
        return data;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || 'internal server error')
    }
})

export const deleteAddress =createAsyncThunk('/addresses/deleteAddress',async({userId,addressId})=>{
    try {
        const {data} = await axios.delete(`${SHOP_API}/address/delete/${userId}/${addressId}`)
        toast.success("Address deleted successfully....")
        return data;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || 'internal server error')
    }
})

const addressSlice = createSlice({
    name:"addressSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //add address
        .addCase(addNewAddress.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(addNewAddress.fulfilled,(state,action)=>{
            state.isLoading = false
        })
        .addCase(addNewAddress.rejected,(state,action)=>{
            state.isLoading = false
        })

        //fetch all address
        .addCase(fetchAllAddress.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(fetchAllAddress.fulfilled,(state,action)=>{
            // console.log(action)
            state.isLoading = false
            state.addressList = action?.payload?.data
        })
        .addCase(fetchAllAddress.rejected,(state,action)=>{
            state.isLoading = false
            state.addressList = []
        })
    }
})

export default addressSlice.reducer