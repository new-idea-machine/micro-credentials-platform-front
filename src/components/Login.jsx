// ============================================================================
// IMPORTS
// ============================================================================

import {useContext} from "react";
import validator from "validator";
import {UserContext} from "../contexts/UserContext";

import {sendRequest} from "../scripts/sendrequest.js";

// ============================================================================
// GLOBAL CONSTANTS
// ============================================================================

const serverURL = import.meta.env.VITE_SERVER_URL_ROOT;

// ============================================================================
// GLOBAL ASSERTIONS
// ============================================================================

console.assert(serverURL?.length > 0, "Server URL not specified -- add " +
  "\"VITE_SERVER_URL_ROOT=<url>\" to .env");

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================

/*****************************************************************************/

function Login({setCredentials}) {
  const {setUserInfo} = useContext(UserContext);

  /***************************************************************************/

  async function submit(submitEvent) {
    /*
    Send the user login credentials that's in the login form to the server and
    handle the response.

    If any field in the login form contains invalid data then an appropriate
    message is displayed.

    If the server successfully found the user in the database and the password
    is correct then the user information context is set to this new user.  If
    the password is incorrect then user is invited to try a different password.
    If the user isn't registered then the user is shown the registration form.
    If there was an error then an appropriate message is displayed.
    */

    submitEvent.preventDefault();

    /*
    First, get the information from the login form and package it into a
    JavaScript object to send to the backend.
    */

    const formElements = submitEvent.target.elements;
    const data = {
      email: formElements.Email.value,
      password: formElements.Password.value
    };

    /*
    Next, before sending this information off, do some validation.

    IMPORTANT NOTE:  As of this writing, what constitutes "valid data" hasn't
    been specified, so validation is rather limited at the moment.
    */

    let dataIsValid = true;

    if (!validator.isEmail(data.email)) {
      dataIsValid = false;

      window.alert("That's not a valid e-mail address!  Who're you trying to kid?");
    }

    if (data.password === "") {
      dataIsValid = false;

      window.alert("You call that a password?  My mother can pick a better password than that!");
    }

    if (dataIsValid) {
      /*
      If the data is valid then send it off to the backend!
      */
      const resource = `${serverURL}/` +
                       `user?email=${encodeURIComponent(data.email)}&` +
                       `password=${encodeURIComponent(data.password)}`

      const [response, result] = await sendRequest("GET", resource);

      /*
      Finally, if the server successfully found the user in the database and
      the password is good then set the user information context with the
      relevant data so that the home page will be displayed.  If the user isn't
      registered then set the credentials to the login data so that the
      registration form will be displayed.  Otherwise, display an appropriate
      message.
      */

      if (response === null) {
        window.alert("Login failed.\n\nThe server could not be accessed.  Please try again later.");
      }
      else if (response.status === 403) {
        window.alert("Login failed.\n\nThat was the wrong password.");
      }
      else if (response.status === 404) {
        setCredentials(data);
      }
      else if (response.status === 406) {
        console.log(`HTTP response code 406 -- "${result?.msg}"`);
        window.alert("Login failed.\n\nThe server couldn't make sense of the data that was sent to it.  Please reload or try again later");
      }
      else if (response.status === 503) {
        window.alert("Login failed.\n\nThe server couldn't access the database.  Please try again later.");
      }
      else if (!response.ok) {
        window.alert("Login failed.\n\nThis application is having a bad day.  Please reload or try again later.");
      }
      else if (!result?.userUID) {
        window.alert("Login failed.\n\nThe response from the server was not understood.  Please reload or try again later");
      }
      else {
        const newUserInfo = {
          userUID: result.userUID,
          name:    result.name,
          email:   formElements.Email.value
        };

        setUserInfo(newUserInfo);
      }
    }

    return;
  }

  /***************************************************************************/

  return (
    <>
      <h1>Log In or Register</h1>

      <hr />

      <p>
        Please log in or start registering by filling in and submitting this
        form:
      </p>

      <form id="LoginForm" onSubmit={submit}>
        E-mail Address:<br />
        <input name="Email" type="text" /><br />
        Password:<br />
        <input name="Password" type="password" /><br />

        <input type="submit" value="Log In or Register" />
      </form>
    </>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export default Login;
