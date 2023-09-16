import sendRequest from "../../api";
import {
  getOneProductFailure,
  getOneProductStart,
  getOneProductSuccess,
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
  getProductsByCatStart,
  getProductsByCatSuccess,
  getProductsByCatFailure,
  filterPoductsSuccess,
  getSimilarProductsStart,
  getSimilarProductsSuccess,
  getSimilarProductsFailure
} from "./productsSlice";

const getProducts = async (dispatch) => {
	dispatch(getProductsStart());
  try {
    const res = await sendRequest("getProducts");
    dispatch(getProductsSuccess(res.data.results));
  } catch (error) {
    dispatch(getProductsFailure(error.message));
  }
};

const getOneProduct = async (dispatch, productId) => {
  dispatch(getOneProductStart());
  try {
    const res = await sendRequest("getProducts", null, productId);
    dispatch(getOneProductSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getOneProductFailure(error.message));
  }
};

const getProductsByCat = async (dispatch, url, type) => {
  await dispatch(getProductsByCatStart());
  try {
    const res = await sendRequest("getProducts", null, url);
    switch (type) {
      case "filter":
        dispatch(filterPoductsSuccess(res.data.results));
        break;
    
      case "loadmore":
        dispatch(getProductsByCatSuccess(res.data.results));
        break;

      default:
        dispatch(filterPoductsSuccess(res.data.results));
        break;
    }
    return res;
  } catch (error) {
    dispatch(getProductsByCatFailure(error.message));
  }
};

const getSimilarProducts = async (dispatch, url) => {
  dispatch(getSimilarProductsStart());
  try {
    const res = await sendRequest("getProducts", null, url);
    dispatch(getSimilarProductsSuccess(res.data.results));
    return res;
  } catch (error) {
    dispatch(getSimilarProductsFailure(error.message));
  }
};

export {
  getProducts,
  getOneProduct,
  getProductsByCat,
  getSimilarProducts
};
