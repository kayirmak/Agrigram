import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./auth/authSlice";
import cartSlice from "./cart/cartSlice";
import categorySlice from "./category/categorySlice";
import productsSlice from "./products/productsSlice";
import shopsSlice from "./shop/shopsSlice";
import serviceSlice from  "./service/serviceSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["authSlice"]
}

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuth", "currentUser"]
}

const favsPersistConfig = {
  key: "favs",
  storage,
  whitelist: ["favs", "cartItems"]
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  products: productsSlice,
	category: categorySlice,
	shops: shopsSlice,
  cart: persistReducer(favsPersistConfig, cartSlice),
  service: serviceSlice,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>

  getDefaultMiddleware({
    serializableCheck: false,
    // serializableCheck: {
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, registerFailure],
    // },
  }),
})

export const persistor = persistStore(store);
export default store;
