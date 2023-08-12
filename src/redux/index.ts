import { configureStore } from "@reduxjs/toolkit";
import configurationSlice from "./configuration-slice";
import productSlice from "./product-slice";

const store = configureStore({
    reducer: {
        configuration: configurationSlice.reducer,
        product : productSlice.reducer
    }
})

export default store