// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import FilePage from "./pages/FilePage";

import NavBar from "./components/NavBar";

import "./App.css";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

function App() {
  const { userInfo } = useContext(UserContext);

  return (
    <>
      <NavBar />

      {/* {userInfo == null ? <LoginPage /> : <HomePage />}  */}
      {userInfo == null ? <LoginPage /> : <FilePage />}
    </>
  );
}

// ============================================================================================
// EXPORTS
// ============================================================================================

export default App;
