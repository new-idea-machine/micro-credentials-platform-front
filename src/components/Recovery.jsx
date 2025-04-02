// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext.jsx";
import InputNewPassword from "./InputNewPassword.jsx";

import { sendRequest } from "../scripts/sendrequest.js";
import { getFormData } from "../scripts/getFormData.js";
import { User } from "../scripts/databaseSchemas.js";

// ============================================================================================
// GLOBAL CONSTANTS
// ============================================================================================

const serverURL = import.meta.env.VITE_SERVER_URL_ROOT;

// ============================================================================================
// GLOBAL ASSERTIONS
// ============================================================================================

console.assert(
  serverURL?.length > 0,
  "Server URL not specified -- add " + '"VITE_SERVER_URL_ROOT=<url>" to .env'
);

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function Recovery({ credentials, setCredentials }) {
  const { setUserInfo } = useContext(UserContext);
  const [passwordIsValid, setPasswordIsValid] = useState();

  /*******************************************************************************************/

  async function submit(submitEvent) {
    /*
    Send the user's new password that's in the recovery form to the server and handle the
    response.

    If any field in the recovery form contains invalid data then an appropriate message is
    displayed.

    If the server successfully changes the user's password then the user information context is
    set to this new user.  If it didn't then an appropriate message is displayed.
    */

    submitEvent.preventDefault();

    /*
    First, get the information from the recovery form and validate it.

    IMPORTANT NOTE:  As of this writing, what constitutes "valid data" hasn't been specified,
    so validation is rather limited at the moment.
    */

    const data = getFormData(submitEvent.target);
    let dataIsValid = true;

    if (data.token === "") {
      dataIsValid = false;
      toast.error('"Recovery Code" is required.');
    }

    console.assert(typeof passwordIsValid === "boolean");

    if (!passwordIsValid) {
      dataIsValid = false;
      toast.error("Password is invalid.");
    }

    if (dataIsValid) {
      /*
      Next, if the data is valid then send it off to the server!
      */

      const headers = new Headers();

      headers.append("Authorization", `Basic ${btoa(credentials.token + ":" + data.token)}`);
      headers.append("Content-Type", "application/json");

      const [response, result] = await sendRequest(
        "PATCH",
        `${serverURL}/auth/recovery`,
        headers,
        JSON.stringify({ password: data.password })
      );

      /*
      Finally, if the server successfully changed the user's password then set the user
      information context with the relevant data so that the home page will be displayed.
      Otherwise, display an appropriate message.
      */

      if (response === null) {
        toast.error(
          "Password reset failed.\n\nThe server could not be accessed.  Please try again later."
        );
      } else if (response.status === 401) {
        toast.error("Password reset failed.\n\nThe recovery code was rejected.");
      } else if (response.status === 406) {
        toast.error(
          "Password reset failed.\n\nThe server didn't understand what was sent to it. Please reload or try again later."
        );
      } else if (response.status === 504) {
        toast.error(
          "Password reset failed.\n\nThe server couldn't access the database.  Please try again later."
        );
      } else if (!response.ok) {
        toast.error(
          "Password reset failed.\n\nThis application is having a bad day.  Please reload or try again later."
        );
      } else if (!result?.access_token) {
        toast.error(
          "Password reset failed.\n\nThe response from the server was not understood.  Please reload or try again later."
        );
      } else {
        const newUserInfo = result;

        newUserInfo.user_data = new User(newUserInfo.user_data);

        setUserInfo(newUserInfo);
      }
    }

    return;
  }

  return (
    <>
      <h1>Account Recovery</h1>
      <p>
        An e-mail has been sent to <b>{credentials?.email}</b> with a recovery code. Please
        check your inbox (and spam folder!) for this code and enter it here:
      </p>
      <form id="RecoveryForm" onSubmit={submit}>
        Recovery Code:
        <br />
        <input name="token" type="text" />
        <br />
        <InputNewPassword
          initialPassword={credentials ? credentials.password : ""}
          setPasswordIsValid={setPasswordIsValid}
        />
        <br />
        <input type="submit" value="Reset Password" />
      </form>
      <hr />
      <p>
        If you didn&apos;t receive an e-mail and you&apos;re still sure that you&apos;re already
        registered then you can try using different credentials.
      </p>
      <button
        onClick={() =>
          setCredentials({ email: credentials.email, password: credentials.password })
        }
      >
        Log In with Different Credentials
      </button>
    </>
  );
}

Recovery.propTypes = {
  credentials: PropTypes.object.isRequired,
  setCredentials: PropTypes.func.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default Recovery;
