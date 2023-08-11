import { createSlice } from "@reduxjs/toolkit";

const configurationSlice = createSlice({
  name: "configuration",
  initialState: {
    id: undefined,
    logo: undefined,
    mainColor: undefined,
    hasUser: false,
  },
  reducers: {
      getConfiguration(state, actions) {
          state = actions.payload
    },
  },
});

export const configurationActions = configurationSlice.actions;

export default configurationSlice;
