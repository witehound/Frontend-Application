import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
    initialState: {
        name : ""
    },
  reducers: {
      addProduct : (state, actions) => {
          return actions.payload
      },
      updateProduct : (state, actions) => {
          
      }
  },
});

export const productSliceActions = productSlice.actions;

export default productSlice;
