import {createContext, useState} from "react";
import PropTypes from "prop-types";

export const UserContext = createContext(null);

function UserContextProvider({children}) {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>);
}

UserContextProvider.propTypes = {
  children:  PropTypes.object
};

export default UserContextProvider;
