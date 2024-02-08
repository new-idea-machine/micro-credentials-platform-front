// ============================================================================
// IMPORTS
// ============================================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {UserContextProvider} from "./contexts/UserContext";

import "./index.css";

// ============================================================================
// MAIN PROGRAM
// ============================================================================

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
);
