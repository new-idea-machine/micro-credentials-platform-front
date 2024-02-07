import {useContext} from "react";
import {UserContext} from "./contexts/UserContext";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import "./App.css"

function App() {
  const {userInfo} = useContext(UserContext);

  return (
    <>
      {userInfo == null ? <LoginPage /> : <HomePage />}
    </>
  )
}

export default App;
