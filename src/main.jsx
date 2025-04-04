// ============================================================================
// IMPORTS
// ============================================================================

import React from "react";
import ReactDOM from "react-dom/client";
import './styles/custom.scss'; // Import the main SCSS file
import App from "./App.jsx";

import { UserContextProvider } from "./contexts/UserContext";

import "./index.css";
import { CoursesContextProvider } from "./contexts/CoursesContext.jsx";
import { BrowserRouter } from "react-router-dom";

// ============================================================================
// MAIN PROGRAM
// ============================================================================

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <CoursesContextProvider>
          <App />
        </CoursesContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
