// ============================================================================================
// IMPORTS
// ============================================================================================

import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Recovery from "../components/Recovery";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function LoginPage() {
  const [credentials, setCredentials] = useState(null);

  return (
    <>
      {credentials?.token === true ? (
        <Recovery credentials={credentials} setCredentials={setCredentials} />
      ) : credentials?.unregistered === true ? (
        <Register credentials={credentials} setCredentials={setCredentials} />
      ) : (
        <Login credentials={credentials} setCredentials={setCredentials} />
      )}
    </>
  );
}

// ============================================================================================
// EXPORTS
// ============================================================================================

export default LoginPage;
