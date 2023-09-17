import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  service: [],
  isLoading: false,
  error: false,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    getAllServiceStart: (state) => {
      state.isLoading = true;
    },
    getAllServiceSuccess: (state, action) => {
      state.service = action.payload;
      state.isLoading = false;
    },
    getAllServiceFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
	getAllServiceStart,
  getAllServiceSuccess,
  getAllServiceFailure,
} = serviceSlice.actions;

export default serviceSlice.reducer;
