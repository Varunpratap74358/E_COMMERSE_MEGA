import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index'
import adminProductsSlice from './admin/product-slice/index'
import shoppingProductsSlice from './shop/productSlice/index'
import shoppingCartSlice from './shop/cartSlice/index'
import shopAddressSlice from './shop/addressSlice/index'
import shopOderSlice from './shop/orderSlice/index'
import adminOrderSlice from './admin/orderSlice/index'
import shopSearchSlice from './shop/searchSlice/index'
import shopReviewSlice from './shop/reviewSlice/index'
import commanFeatureSlice from './comman/index'

const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductsSlice,
        adminOrder:adminOrderSlice,
        shopProducts:shoppingProductsSlice,
        shopCart: shoppingCartSlice,
        shopAddress:shopAddressSlice,
        shopOrder:shopOderSlice,
        shopSearch:shopSearchSlice,
        shopReview:shopReviewSlice,
        commanFeature:commanFeatureSlice
    }
})

export default store;