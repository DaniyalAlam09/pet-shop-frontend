import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { CatagoriesProvider } from "./context/catagoriesProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CatagoriesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CatagoriesProvider>
  </React.StrictMode>
);
