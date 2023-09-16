import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    currentUser: {},
    userOrders: [],
    loading: false,
    photoLoading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerStart: (state) => {
            state.loading = true
            state.isAuth = false
        },
        registerSuccess: (state, action) => {
            state.loading = false
            state.isAuth = true
            state.currentUser = action.payload
        },
        registerFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuth = false
        },

        authStart: (state) => {
            state.loading = true
            state.isAuth = false
        },
        authSuccess: (state, action) => {
            state.loading = false
            state.isAuth = true
            state.currentUser = action.payload
        },
        authFailure: (state, action) => {
            state.isAuth = false
            state.loading = false
            state.error = action.payload
        },

        changeUserStart: (state) => {
            state.loading = true
        },
        changeUserSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },
        changeUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        changeUserPhotoStart: (state) => {
            state.photoLoading = true
        },
        changeUserPhotoSuccess: (state) => {
            state.photoLoading = false
        },
        changeUserPhotoFailure: (state) => {
            state.photoLoading = false
        },

        getOrdersStart: (state) => {
            state.loading = true
        },
        getOrdersSuccess: (state, action) => {
            state.loading = false
            state.userOrders = action.payload
        },
        getOrdersFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        deleteAccountStart: (state) => {
            state.loading = true
        },
        deleteAccountSuccess: (state) => {
            state.loading = false
            state.currentUser = {}
            state.isAuth = false
        },
        deleteAccountFailure: (state) => {
            state.loading = false
            state.isAuth = true
        },

        logoutStart: (state) => {
            state.loading = true
        },
        logoutSuccess: (state) => {
            state.loading = false
            state.currentUser = {}
            state.isAuth = false
        },
        logoutFailure: (state) => {
            state.loading = false
        },

        clearAuthError: (state) => {
            state.error = null
        }
    },
})


export const {
    registerStart,
    registerSuccess,
    registerFailure,
    authStart,
    authSuccess,
    authFailure,
    changeUserStart,
    changeUserSuccess,
    changeUserFailure,
    changeUserPhotoStart,
    changeUserPhotoSuccess,
    changeUserPhotoFailure,
    getOrdersStart,
    getOrdersSuccess,
    getOrdersFailure,
    deleteAccountStart,
    deleteAccountSuccess,
    deleteAccountFailure,
    logoutSuccess,
    logoutFailure,
    clearAuthError
} = authSlice.actions;
export default authSlice.reducer;