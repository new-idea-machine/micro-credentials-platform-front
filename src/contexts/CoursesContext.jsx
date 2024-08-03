// ============================================================================================
// IMPORTS
// ============================================================================================

import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContextProvider } from "./UserContext";

const CoursesContext = createContext(null);

function CoursesContextProvider({ children }) {
  const [coursesInfo, setCoursesInfo] = useState(null);

  return (
    <CoursesContext.Provider value={{ coursesInfo, setCoursesInfo }}>
      {children}
    </CoursesContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.object
};

export { CoursesContext, CoursesContextProvider };
