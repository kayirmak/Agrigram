import sendRequest from "../../api";
import {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,
  getSubCategoryStart,
  getSubCategorySuccess,
  getSubCategoryFailure,
  getOneCategoryStart,
  getOneCategorySuccess,
  getOneCategoryFailure,
  getCategoriesByShopStart,
  getCategoriesByShopSuccess,
  getCategoriesByShopFailure } from "./categorySlice";

const getCategory = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await sendRequest("getCategory");
    const subCategories = await getSubCategory(dispatch);
    const categories = res.data.map(category => {
      const subcategory = subCategories.find(sub => sub.category === category.id);
      return {...category, subcategory: subcategory ? [subcategory] : null}
    })
    dispatch(getCategorySuccess(categories));
  } catch (error) {
    dispatch(getCategoryFailure(error));
  }
};

const getSubCategory = async (dispatch) => {
  dispatch(getSubCategoryStart());
  try {
    const res = await sendRequest("getSubCategory");
    dispatch(getSubCategorySuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getSubCategoryFailure(error));
  }
};

const getOneCategory = async (dispatch, categoryId) => {
  dispatch(getOneCategoryStart());
  try {
    const res = await sendRequest("getCategory", null, categoryId);
    dispatch(getOneCategorySuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getOneCategoryFailure(error));
  }
};

const getCategoriesByShop = async (dispatch, categoryId) => {
  dispatch(getCategoriesByShopStart());
  try {
    const res = await sendRequest("getCategoriesByShop", null, categoryId);
    dispatch(getCategoriesByShopSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getCategoriesByShopFailure(error));
  }
};

export {
  getCategory,
  getSubCategory,
  getOneCategory,
  getCategoriesByShop
};
