// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext.jsx";

import { sendRequest } from "../scripts/sendrequest.js";

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
    First, get the information from the recovery form and package it into a JavaScript object
    to send to the server.
    */

    const formElements = submitEvent.target.elements;
    const data = {
      token: formElements.Token.value.trim(),
      password: formElements.Password.value,
      password2: formElements.Password2.value
    };

    /*
    Next, before sending this information off, do some validation.

    IMPORTANT NOTE:  As of this writing, what constitutes "valid data" hasn't been specified,
    so validation is rather limited at the moment.
    */

    let dataIsValid = true;

    if (data.token === "") {
      dataIsValid = false;

      window.alert('"Recovery Code" is required.');
    }

    if (data.password !== data.password2) {
      dataIsValid = false;

      window.alert("The two passwords don't match.");
    }

    if (dataIsValid) {
      /*
      If the data is valid then send it off to the server!
      */

      const headers = new Headers();

      headers.append("Authorization", `Basic ${btoa(credentials.token + ":" + data.password)}`);
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
        window.alert(
          "Password reset failed.\n\nThe server could not be accessed.  Please try again later."
        );
      } else if (response.status === 401) {
        window.alert("Password reset failed.\n\nThe recovery code was rejected.");
      } else if (response.status === 406) {
        ("Password reset failed.\n\nThe server didn't understand what was sent to it.  Please reload or try again later.");
      } else if (response.status === 504) {
        window.alert(
          "Password reset failed.\n\nThe server couldn't access the database.  Please try again later."
        );
      } else if (!response.ok) {
        window.alert(
          "Password reset failed.\n\nThis application is having a bad day.  Please reload or try again later."
        );
      } else if (!result?.access_token) {
        window.alert(
          "Password reset failed.\n\nThe response from the server was not understood.  Please reload or try again later."
        );
      } else {
        const newUserInfo = result;

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
        <input name="Token" type="text" />
        <br />
        Password:
        <br />
        <input
          name="Password"
          type="password"
          defaultValue={credentials ? credentials.password : ""}
        />
        <br />
        Re-Enter Password:
        <br />
        <input name="Password2" type="password" defaultValue={""} />
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
      </button>{" "}
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
