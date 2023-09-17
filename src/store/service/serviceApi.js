import sendRequest from "../../api";
import { getAllServiceFailure, getAllServiceStart, getAllServiceSuccess } from "./serviceSlice";

const getAllService = async (dispatch) => {
	dispatch(getAllServiceStart());
  try {
    const res = await sendRequest("getAllService");
    dispatch(getAllServiceSuccess(res.data.results));
    console.log(res)
  } catch (error) {
    dispatch(getAllServiceFailure(error.message));
  }
};

export {
  getAllService
};