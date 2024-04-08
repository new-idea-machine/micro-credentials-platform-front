// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

function HomePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  return (
    <>
      <p>User information:</p>

      <table border={2}>
        <tbody>
          <tr>
            <th>UID</th>
            <td>{userInfo.userUID}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{userInfo.name}</td>
          </tr>
          <tr>
            <th>E-mail</th>
            <td>{userInfo.email}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <button onClick={() => setUserInfo(null)}>Go back to login screen.</button>
    </>
  );
}

// ============================================================================================
// EXPORTS
// ============================================================================================

export default HomePage;
