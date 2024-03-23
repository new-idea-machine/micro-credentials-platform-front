// ============================================================================================
// IMPORTS
// ============================================================================================

import { createContext, useState } from "react";
import PropTypes from "prop-types";

// ============================================================================================
// GLOBAL CONSTANTS
// ============================================================================================

const UserContext = createContext(null);

// ============================================================================================
// CONTEXT DEFINITION
// ============================================================================================

function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.object
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export { UserContext, UserContextProvider };
