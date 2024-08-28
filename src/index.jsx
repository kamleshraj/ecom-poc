import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyle.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import "react-loading-skeleton/dist/skeleton.css";

import { SkeletonTheme } from "react-loading-skeleton";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#e9e9e9" highlightColor="#444">
      <Provider store={store}>
        <App />
      </Provider>
    </SkeletonTheme>
  </React.StrictMode>
);
