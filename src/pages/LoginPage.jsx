// ============================================================================
// IMPORTS
// ============================================================================

import {useState} from "react";
import Login from "../components/Login";
import Register from "../components/Register";

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================

/*****************************************************************************/

function LoginPage() {
  const [credentials, setCredentials] = useState(null);

  return (credentials === null ?
    <Login setCredentials={setCredentials} /> :
    <Register credentials={credentials} setCredentials={setCredentials} />)
}

// ============================================================================
// EXPORTS
// ============================================================================

export default LoginPage;
