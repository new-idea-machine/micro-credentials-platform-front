// ============================================================================
// IMPORTS
// ============================================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { UserContextProvider } from "./contexts/UserContext";

import "./index.css";
import { CoursesContextProvider } from "./contexts/CoursesContext.jsx";

// ============================================================================
// MAIN PROGRAM
// ============================================================================

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <CoursesContextProvider>
        <App />
      </CoursesContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
