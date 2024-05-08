import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";

import { store } from "./store/store";
import { Provider } from "react-redux";

import App from "./App";

import { AppProvider } from "./contexts/GlobalContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>
);
