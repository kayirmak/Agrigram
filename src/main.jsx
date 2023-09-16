import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store/store";

import App from "./components/App/App";
import Loader from "./components/Loader/Loader";

import "./i18n";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><Loader /></div>}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
