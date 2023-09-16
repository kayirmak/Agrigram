import sendRequest from "../../api";
import {
  getShopsStart,
  getShopsFailure,
  getShopsSuccess,
  getOneShopStart,
  getOneShopSuccess,
  getOneShopFailure } from "./shopsSlice";

const getShops = async (dispatch, params) => {
  dispatch(getShopsStart());
  try {
    const res = await sendRequest("getStore", null, params);
    dispatch(getShopsSuccess(res.data));
  } catch (error) {
    dispatch(getShopsFailure(error.message));
	}
};

const getOneShop = async (dispatch, storeId) => {
  dispatch(getOneShopStart());
  try {
    const res = await sendRequest("getStore", null, storeId);
    dispatch(getOneShopSuccess(res.data));
  } catch (error) {
    dispatch(getOneShopFailure(error.message));
  }
}

export { getShops, getOneShop };