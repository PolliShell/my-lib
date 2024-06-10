import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { StateProvider } from "./providers/StateProvider.jsx";
import { HelperProvider } from "./providers/HelperProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <StateProvider>
      <BrowserRouter>
        <HelperProvider>
          <App />
        </HelperProvider>
      </BrowserRouter>
    </StateProvider>
  </AuthProvider>
);
