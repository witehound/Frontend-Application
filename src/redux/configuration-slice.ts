import { createSlice } from "@reduxjs/toolkit";

const configurationSlice = createSlice({
  name: "configuration",
  initialState: {
    id: undefined,
    logo: undefined,
    mainColor: undefined,
    hasUserSection: false,
  },
  reducers: {
      addConfiguration : (state, actions) => {
          return actions.payload
    },
  },
});

export const configurationActions = configurationSlice.actions;

export default configurationSlice;
