import { configureStore } from "@reduxjs/toolkit";
import configurationSlice from "./configuration-slice";

const store = configureStore({
    reducer: {
        configuration : configurationSlice.reducer
    }
})

export default store