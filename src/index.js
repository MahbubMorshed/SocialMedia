import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { loaderReducer } from "./redux/loaderReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: loaderReducer });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
