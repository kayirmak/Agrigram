import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsByCat: [],
  similarProducts: [],
	currentProduct: {},
  isLoading: false,
  error: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsStart: (state) => {
      state.isLoading = true;
    },
    getProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    getProductsFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    getOneProductStart: (state) => {
      state.isLoading = true;
    },
    getOneProductSuccess: (state, action) => {
      state.isLoading = false;
      state.currentProduct = action.payload;
    },
    getOneProductFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getProductsByCatStart: (state) => {
      state.isLoading = true
    },
    getProductsByCatSuccess: (state, action) => {
      state.isLoading = false;
      state.productsByCat = [...state.productsByCat, ...action.payload];
    },
    filterPoductsSuccess: (state, action) => {
      state.productsByCat = action.payload
      state.isLoading = false;
    },
    getProductsByCatFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getSimilarProductsStart: (state) => {
      state.isLoading = true;
    },
    getSimilarProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.similarProducts = action.payload;
    },
    getSimilarProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
	getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  getOneProductStart,
  getOneProductSuccess,
  getOneProductFailure,
  getProductsByCatStart,
  getProductsByCatSuccess,
  getProductsByCatFailure,
  filterPoductsSuccess,
  getSimilarProductsStart,
  getSimilarProductsSuccess,
  getSimilarProductsFailure
} = productsSlice.actions;

export default productsSlice.reducer;
