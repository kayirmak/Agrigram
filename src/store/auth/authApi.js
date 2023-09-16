import { auth, } from "../../../firebase.config";
import sendRequest from "../../api";

import { 
    registerStart,
    registerSuccess,
    registerFailure,
    authFailure,
    authStart,
    authSuccess,
    changeUserFailure,
    changeUserStart,
    changeUserSuccess,
    changeUserPhotoStart,
    getOrdersStart,
    getOrdersSuccess,
    getOrdersFailure,
    deleteAccountStart,
    deleteAccountSuccess,
    deleteAccountFailure,
    logoutSuccess,
    logoutFailure,
    changeUserPhotoSuccess} from "./authSlice";

const registerUser = async (dispatch, body, callback = () => {}) => {
    dispatch(registerStart());
    return new Promise((resolve, reject) => {
        sendRequest("createUser", body)
            .then(res => {
                dispatch(registerSuccess(res.data));
                resolve(res.data);
                callback();
            })
            .catch(err => {
                dispatch(registerFailure(err.response.data.login[0]));
            })
    })
}

const authUser = async (dispatch, body, callback = () => {}) => {
    dispatch(authStart());
    return new Promise((resolve) => {
        sendRequest("authUser", body)
            .then(res => {
                dispatch(authSuccess(res.data.data[0]));
                callback();
                resolve(res.data.data[0]);
            })
            .catch(err => {
                dispatch(authFailure(err.response.data.detail[0]));
            })
    })
}

const authWithGoogle = async (dispatch, userByGoogle, callback) => {
    dispatch(authStart());
    const foundUser = await sendRequest("getAllUsers", null, `?login=${userByGoogle.user.email}`);
    if (foundUser.data.results.length) {
        sendRequest("authUser", {login: userByGoogle.user.email, password: userByGoogle.user.email})
            .then(res => {
                dispatch(authSuccess(res.data.data[0]));
                callback();
            })
            .catch(() => {
                dispatch(authFailure("Пользователь с таким логином уже существует"));
            })
    }
    else {
        registerUser(dispatch, {login: userByGoogle.user.email, name: userByGoogle.user.displayName, password: userByGoogle.user.email, photo: userByGoogle.user.photoURL, uid: Date.now()}, callback)
    }
}

const changeUser = async (dispatch, body, callback, id) => {
    dispatch(changeUserStart());
    try {
        const res = await sendRequest("changeUser", body, id)
        dispatch(changeUserSuccess(res.data));
        callback();
    } catch (error) {
        dispatch(changeUserFailure(error.message));
    }
}

const changeUserPhoto = async (dispatch, payload) => {
    dispatch(changeUserPhotoStart())
    try {
        const {photo, photoId, userId} = payload;
        let res;
        let newPhotoId = photoId;
        if (photoId) {
           res = await sendRequest("changeUserPhoto", photo, photoId);
        } else {
            res = await sendRequest("createUserPhoto", photo) 
            newPhotoId = res.data.id;
        }
        dispatch(changeUserPhotoSuccess());

        changeUser(dispatch, {
            photo: res.data.image,
            photoId: newPhotoId
        }, () => {}, userId);

    } catch (error) {
        console.log(error);
    }
}

const getOrders = async (dispatch, url) => {
    dispatch(getOrdersStart());
    try {
        const res = await sendRequest("getOrders", null, url);
        dispatch(getOrdersSuccess(res.data.results));
    } catch (error) {
        dispatch(getOrdersFailure(error))
    }
}

const deleteAccount = async (dispatch, callback, userId) => {
    dispatch(deleteAccountStart());
    try {
        await sendRequest("deleteAccount", null, userId);
        dispatch(deleteAccountSuccess());
        callback();
    } catch (error) {
        dispatch(deleteAccountFailure(error.message));
    }
}

const resetPassword = async (email) => {
    try {
        const res = await sendRequest("resetPassword", email);
        return res;
    } catch (error) {
        return error;
    }
}

const resetPasswordAfterCode = async (code) => {
    return new Promise((resolve, reject) => {
        sendRequest("resetPasswordAfterCode", code)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err.response.data.error[0]);
            })
    })
}

const changePassword = (data, token) => {
    return new Promise((resolve, reject) => {
        sendRequest("changePassword", data, null, {Authorization: `Token ${token}`})
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const logout = async (dispatch) => {
    try {
        await auth.signOut();
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFailure(error.response));
    }
}

export {
    registerUser,
    authUser,
    authWithGoogle,
    changeUser,
    changeUserPhoto,
    getOrders,
    deleteAccount,
    resetPassword,
    resetPasswordAfterCode,
    changePassword,
    logout
}