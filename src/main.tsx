import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";

import App from "./App";

import { AppProvider } from "./contexts/GlobalContext";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AppProvider>
  </React.StrictMode>
);
