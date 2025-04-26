import { SHOP_API } from "@/api/API"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "sonner"


const initialState = {
    approvalURL:null,
    isLoading:false,
    orderId:null,
    orderList:[],
    orderDetails:null
}


export const createNewOrder = createAsyncThunk('/order/createNewOrder',async(orderData)=>{
    try {
        const {data} = await axios.post(`${SHOP_API}/order/create`,orderData)
        toast.success("Order created successfulli....")
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Interner server error")
        console.log(error)
    }
})

export const capturePayment = createAsyncThunk('/order/capturePayment',async({paymentId,payerId,orderId})=>{
    try {
        const {data} = await axios.post(`${SHOP_API}/order/capture`,{paymentId,payerId,orderId})
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Interner server error")
        console.log(error)
    }
})


export const getAllOrdersByUserId = createAsyncThunk('/order/getAllOrdersByUserId',async(userId)=>{
    try {
        const {data} = await axios.get(`${SHOP_API}/order/list/${userId}`)
        console.log(data)
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Interner server error")
        console.log(error)
    }
})


export const getOrderDetails = createAsyncThunk('/order/getOrderDetails',async(id)=>{
    try {
        const {data} = await axios.get(`${SHOP_API}/order/details/${id}`)
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Interner server error")
        console.log(error)
    }
})


const shoppingOrderSlice = createSlice({
    name:'shoppingOrderSlice',
    initialState,
    reducers:{
        resetOrderDetails:(state,action)=>{
            state.orderDetails = null
        }
    },
    extraReducers:(builder)=>{
        builder
        //for create a new order
        .addCase(createNewOrder.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(createNewOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.approvalURL = action?.payload.approvalURL
            state.orderId = action?.payload?.orderId
            sessionStorage.setItem('currentOrderId',JSON.stringify(action?.payload?.orderId))
        })
        .addCase(createNewOrder.rejected,(state,action)=>{
            state.isLoading = false 
            state.approvalURL = null
            state.orderId = null
        })

        //getAll orders
        .addCase(getAllOrdersByUserId.pending,(state,action)=>{
            console.log("data")
            state.isLoading=true;
        })
        .addCase(getAllOrdersByUserId.fulfilled,(state,action)=>{
            console.log(action)
            state.isLoading=false;
            state.orderList = action?.payload?.data;
            // console.log(state.orderList)
        })
        .addCase(getAllOrdersByUserId.rejected,(state,action)=>{
            console.log("data")
            state.isLoading=false;
            state.orderList = [];
        })

        //get order details
        .addCase(getOrderDetails.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.orderDetails = action?.payload?.data;
        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
            state.isLoading=false;
            state.orderDetails = null;
        })
    }
})

export const {resetOrderDetails} = shoppingOrderSlice.actions

export default shoppingOrderSlice.reducer