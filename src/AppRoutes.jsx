import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { UserContext } from "./contexts/UserContext";
import InstructorPage from "./pages/InstructorPage";

function AppRoutes() {
  const { userInfo } = useContext(UserContext);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userInfo == null ? <LandingPage /> : <Navigate to="/homepage" />}
        />
        <Route
          path="/login"
          element={userInfo == null ? <LoginPage /> : <Navigate to="/homepage" />}
        />
        <Route
          path="/homepage"
          element={
            userInfo == null ? (
              <Navigate to="/login" />
            ) : userInfo?.user_data?.instructorData == null ? (
              <HomePage />
            ) : (
              <InstructorPage />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
