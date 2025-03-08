/**
 * @file User information context module.
 *
 * This module provides a React context for managing user information throughout the application.
 * It handles storing and retrieving the user information  in the browser's session storage so that
 * it can persist across page refreshes within the same browser session.
 *
 * This context maintains two key pieces of state:
 * - `userInfo`:  Contains the user's information when logged in, `null` when logged out
 * - `setUserInfo`:  Function to update the user's information
 *
 * @module UserContext
 */

// ============================================================================================
// IMPORTS
// ============================================================================================

import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// ============================================================================================
// GLOBAL CONSTANTS
// ============================================================================================

const userInfoKey = "userInfo";
/**
 * React context for user information.
 *
 * @type React.Context<{userInfo: Object|null, setUserInfo: function}>
 */
const UserContext = createContext(null);

// ============================================================================================
// CONTEXT DEFINITION
// ============================================================================================

/**
 * Context provider component for UserContext.
 *
 * This component manages the user information state, including:
 * - Loading the complete user information object from session storage on mount
 * - Persisting the complete user information to session storage when it changes
 * - Providing the current user state and methods to update it to child components
 *
 * @component
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components that will have access to this Context
 * @returns {React.ReactElement} UserContext provider component
 */
function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    /*
    Initialize userInfo using data from session storage (if any).
    */

    const storedUserInfo = sessionStorage.getItem(userInfoKey);

    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  useEffect(() => {
    /*
    Whenever "userInfo" changes, either save it in or delete it from session storage (as
    appropriate).
    */

    if (userInfo) {
      sessionStorage.setItem(userInfoKey, JSON.stringify(userInfo));
    } else {
      sessionStorage.removeItem(userInfoKey);
    }
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node
};

// ============================================================================================
// EXPORTS
// ============================================================================================

/**
 * UserContext for accessing and managing user information.
 *
 * @type {React.Context}
 */
export { UserContext, UserContextProvider };