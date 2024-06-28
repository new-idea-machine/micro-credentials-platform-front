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

  if (credentials?.token === true)
    return <Recovery credentials={credentials} setCredentials={setCredentials} />;

  if (credentials?.unregistered === true)
    return <Register credentials={credentials} setCredentials={setCredentials} />;

  return <Login credentials={credentials} setCredentials={setCredentials} />;
}

// ============================================================================================
// EXPORTS
// ============================================================================================

export default LoginPage;
