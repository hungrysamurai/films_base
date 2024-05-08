import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";

import { store } from "./store/store";
import { Provider } from "react-redux";

import App from "./App";

import { AppProvider } from "./contexts/GlobalContext";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        {/* <UserProvider> */}
        <App />
        {/* </UserProvider> */}
      </AppProvider>
    </Provider>
  </React.StrictMode>
);
