import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shops: [],
  currentShop: {},
  isLoading: false,
  error: null,
};

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    getShopsStart: (state) => {
      state.isLoading = true
    },
    getShopsSuccess: (state, action) => {
      state.shops = action.payload;
      state.isLoading = false
    },
    getShopsFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false
    },

    getOneShopStart: (state) => {
      state.isLoading = true
      state.currentShop = []
    },
    getOneShopSuccess: (state, action) => {
      state.isLoading = false
      state.currentShop = action.payload
    },
    getOneShopFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    }
  },
});

export const {
  getShopsStart,
  getShopsFailure,
  getShopsSuccess,
  getOneShopStart,
  getOneShopSuccess,
  getOneShopFailure
} = shopsSlice.actions;
export default shopsSlice.reducer;