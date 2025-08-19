import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FilePage from "./pages/FilePage";
import CourseCreationPage from "./pages/CourseCreationPage";
import { UserContext } from "./contexts/UserContext";
import InstructorPage from "./pages/InstructorPage";

function AppRoutes() {
  const { userInfo } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={userInfo ? <Navigate to="/homepage" /> : <LandingPage />} />
        <Route path="/login" element={userInfo ? <Navigate to="/homepage" /> : <LoginPage />} />
        <Route
          path="/homepage"
          element={
            userInfo ? (
              userInfo.user_data.instructorData ? (
                <InstructorPage />
              ) : (
                <HomePage />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/coursecontent"
          element={
            userInfo ? (
              userInfo.user_data.instructorData ? (
                // <FilePage />
                <CourseCreationPage />
              ) : (
                <></>
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
