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
            <th>Access Token</th>
            <td>{userInfo.access_token}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{userInfo.user_info.name}</td>
          </tr>
          <tr>
            <th>E-mail</th>
            <td>{userInfo.user_info.email}</td>
          </tr>
          <tr>
            <th>Learner Data</th>
            <td>{JSON.stringify(userInfo.user_info.learnerData)}</td>
          </tr>
          <tr>
            <th>Instructor Data</th>
            <td>{JSON.stringify(userInfo.user_info.instructorData)}</td>
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
