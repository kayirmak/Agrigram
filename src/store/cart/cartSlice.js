import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartItems: [],
  favs: [],
  error: null
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartItemsStart: (state) => {
    },
    getCartItemsSuccess: (state, action) => {
      state.cartItems = action.payload
    },
    getCartItemsFailure: (state, action) => {
      state.error = action.payload
    },

    getFavsSuccess: (state, action) => {
      state.favs = action.payload
    }
  }
})

export const {
  getCartItemsStart,
  getCartItemsSuccess,
  getCartItemsFailure,
  getFavsSuccess
} = cartSlice.actions;
export default cartSlice.reducer;