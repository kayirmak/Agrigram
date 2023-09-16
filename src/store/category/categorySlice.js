import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  subCategory: [],
  oneCategory: {},
  categorySearch: [],
  categoriesByShop: [],
	isLoading: false,
	error: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoryStart: (state) => {
      state.isLoading = true
    },
    getCategorySuccess: (state, action) => {
      state.category = action.payload
      state.isLoading = false
    },
    getCategoryFailure: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },

    getSubCategoryStart: (state) => {
      state.isLoading = true
    },
    getSubCategorySuccess: (state, action) => {
      state.subCategory = action.payload
      state.isLoading = false
    },
    getSubCategoryFailure: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },

    getOneCategoryStart: (state) => {
      state.isLoading = true
    },
    getOneCategorySuccess: (state, action) => {
      state.oneCategory = action.payload
      state.isLoading = false
    },
    getOneCategoryFailure: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },

    getCategoriesByShopStart: (state) => {
      state.isLoading = true
    },
    getCategoriesByShopSuccess: (state, action) => {
      state.categoriesByShop = action.payload
      state.isLoading = false
    },
    getCategoriesByShopFailure: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  },
});

export const { 
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure ,
  getSubCategoryStart,
  getSubCategorySuccess,
  getSubCategoryFailure,
  getOneCategoryStart,
  getOneCategorySuccess,
  getOneCategoryFailure,
  getCategoriesByShopStart,
  getCategoriesByShopSuccess,
  getCategoriesByShopFailure
} = categorySlice.actions;
export default categorySlice.reducer;
