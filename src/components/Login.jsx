// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext } from "react";
import PropTypes from "prop-types";
import validator from "validator";
import { UserContext } from "../contexts/UserContext";

import { sendRequest } from "../scripts/sendrequest.js";
import { getFormData } from "../scripts/getFormData.js";

// ============================================================================================
// GLOBAL CONSTANTS
// ============================================================================================

const serverURL = import.meta.env.VITE_SERVER_URL_ROOT;

// ============================================================================================
// GLOBAL ASSERTIONS
// ============================================================================================

console.assert(
  serverURL?.length > 0,
  'Server URL not specified -- add "VITE_SERVER_URL_ROOT=<url>" to .env'
);

// ============================================================================================
// COMPONENT DEFINITION
// ============================================================================================

/*********************************************************************************************/

function Login({ credentials, setCredentials }) {
  const { setUserInfo } = useContext(UserContext);

  /*******************************************************************************************/

  async function forgotPassword(clickEvent) {
    /*
    Send a request to the server to recover a user's account by e-mail and handle the response.

    If any field in the login form contains invalid data then an appropriate message is
    displayed.

    For security reasons, no error conditions are sent back from the server (except for
    database connectivity issues).  The server finds the user's e-mail address in the database
    then it will send a recovery code to that address which will then be used to reset the
    user's password.  If there was an error then an appropriate message is displayed.
    */

    clickEvent.preventDefault();

    /*
    First, get the information from the login form and validate it.

    IMPORTANT NOTE:  As of this writing, what constitutes "valid data" hasn't been specified,
    so validation is rather limited at the moment.
    */

    const data = getFormData(clickEvent.target.form);
    let dataIsValid = true;

    if (!validator.isEmail(data.email)) {
      dataIsValid = false;

      window.alert("That's not a valid e-mail address!  Who're you trying to kid?");
    }

    if (dataIsValid) {
      /*
      Next, if the data is valid then send it off to the server!
      */
      const headers = new Headers();

      headers.append("Authorization", `Bearer ${btoa(data.email)}`);

      const [response, result] = await sendRequest(
        "GET",
        `${serverURL}/auth/recovery`,
        headers
      );

      /*
      Finally, if the server successfully found the user in the database then save the token
      that was received and the login credentials so that they can be used to reset the user's
      password.  Otherwise, display an appropriate message.
      */

      if (response === null) {
        window.alert(
          "Account recovery failed.\n\nThe server could not be accessed.  Please try again later."
        );
      } else if (response.status === 504) {
        window.alert(
          "Account recovery failed.\n\nThe server couldn't access the database.  Please try again later."
        );
      } else if (!response.ok) {
        window.alert(
          "Account recovery failed.\n\nThis application is having a bad day.  Please reload or try again later."
        );
      } else if (!result?.userIdToken) {
        window.alert(
          "Account recovery failed.\n\nThe response from the server was not understood.  Please reload or try again later."
        );
      } else {
        setCredentials({ token: result.userIdToken, ...data });
      }
    }
  }

  /*******************************************************************************************/

  async function submit(submitEvent) {
    /*
    Send the user login credentials that's in the login form to the server and handle the
    response.

    If any field in the login form contains invalid data then an appropriate message is
    displayed.

    If the server successfully found the user in the database and the password is correct then
    the user information context is set to this new user.  If the password is incorrect then
    user is invited to try a different password.  If the user isn't registered then the user is
    shown the registration form.  If there was an error then an appropriate message is
    displayed.
    */

    submitEvent.preventDefault();

    /*
    First, get the information from the login form and validate it.

    IMPORTANT NOTE:  As of this writing, what constitutes "valid data" hasn't been specified,
    so validation is rather limited at the moment.
    */

    const data = getFormData(submitEvent.target);
    let dataIsValid = true;

    if (!validator.isEmail(data.email)) {
      dataIsValid = false;

      window.alert("That's not a valid e-mail address!  Who're you trying to kid?");
    }

    if (data.password === "") {
      dataIsValid = false;

      window.alert(
        "You call that a password?  My mother can pick a better password than that!"
      );
    }

    if (dataIsValid) {
      /*
      Next, if the data is valid then send it off to the server!
      */
      const headers = new Headers();

      headers.append("Authorization", `Basic ${btoa(data.email + ":" + data.password)}`);

      const [response, result] = await sendRequest("GET", `${serverURL}/auth`, headers);

      /*
      Finally, if the server successfully found the user in the database and the password is
      good then set the user information context with the relevant data so that the home page
      will be displayed.  If the user isn't registered then set the credentials to the login
      data so that the registration form will be displayed.  Otherwise, display an appropriate
      message.
      */

      if (response === null) {
        window.alert(
          "Login failed.\n\nThe server could not be accessed.  Please try again later."
        );
      } else if (response.status === 401) {
        window.alert("Login failed.\n\nThat was the wrong password.");
      } else if (response.status === 404) {
        setCredentials({ unregistered: true, ...data });
      } else if (response.status === 504) {
        window.alert(
          "Login failed.\n\nThe server couldn't access the database.  Please try again later."
        );
      } else if (!response.ok) {
        window.alert(
          "Login failed.\n\nThis application is having a bad day.  Please reload or try again later."
        );
      } else if (!result?.access_token) {
        window.alert(
          "Login failed.\n\nThe response from the server was not understood.  Please reload or try again later."
        );
      } else {
        const newUserInfo = result;

        setUserInfo(newUserInfo);
      }
    }

    return;
  }

  /*******************************************************************************************/

  return (
    <>
      <h1>Log In or Register</h1>

      <hr />

      <p>Please log in or start registering by filling in and submitting this form:</p>

      <form id="LoginForm" onSubmit={submit}>
        E-mail Address:
        <br />
        <input name="email" type="text" defaultValue={credentials ? credentials.email : ""} />
        <br />
        Password:
        <br />
        <input
          name="password"
          type="password"
          defaultValue={credentials ? credentials.password : ""}
        />
        <br />
        <input type="submit" value="Log In or Register" />{" "}
        <button onClick={forgotPassword}>I Forgot my Password</button>
      </form>
    </>
  );
}

Login.propTypes = {
  credentials: PropTypes.object,
  setCredentials: PropTypes.func.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default Login;
