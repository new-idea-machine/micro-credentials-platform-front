import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

function AppRoutes() {
  const { userInfo } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userInfo == null ? <LandingPage /> : <Navigate to="/homepage" />}
        />
        <Route
          path="/login"
          element={userInfo == null ? <LoginPage /> : <Navigate to="/homepage" />}
        />
        <Route path="/homepage" element={userInfo ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
