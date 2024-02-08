// ============================================================================
// IMPORTS
// ============================================================================

import {useContext} from "react";
import {UserContext} from "./contexts/UserContext";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import "./App.css"

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================

function App() {
  const {userInfo} = useContext(UserContext);

  return (
    <>
      {userInfo == null ? <LoginPage /> : <HomePage />}
    </>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export default App;
