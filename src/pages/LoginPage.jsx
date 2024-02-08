// ============================================================================
// IMPORTS
// ============================================================================

import {useContext} from "react";
import validator from "validator";
import {UserContext} from "../contexts/UserContext";

// ============================================================================
// GLOBAL CONSTANTS
// ============================================================================

const serverURL = import.meta.env.VITE_SERVER_URL_ROOT;

// ============================================================================
// GLOBAL ASSERTIONS
// ============================================================================

console.assert(serverURL?.length > 0, "Server URL not specified -- add \"VITE_SERVER_URL_ROOT=<url>\" to .env");

// ============================================================================
// COMPONENT DEFINITION
// ============================================================================

/*****************************************************************************/

function LoginPage() {
  const {setUserInfo} = useContext(UserContext);

  /***************************************************************************/

  async function submit(submitEvent) {
    /*
    Send the user registration information that's in the registration form to
    the server and handle the response.

    If any field in the registration form contains invalid data then an
    appropriate message is displayed.

    If the server successfully added the user to the database then the user
    information context is set to this new user.  If it didn't then an
    appropriate message is displayed.
    */

    submitEvent.preventDefault();

    /*
    First, get the information from the registration form and package it into
    a JavaScript object to send to the backend.
    */

    const formElements = submitEvent.target.elements;
    const data = {
      userInfo: {
        name: formElements.Name.value,
        email: formElements.Email.value
      },
      password: formElements.Password.value,
      isInstructor:  false
    };

    /*
    Next, before sending this information off, do some validation.

    IMPORTANT NOTE:  As of this writing, what constitutes "valid data" hasn't
    been specified, so validation is rather limited at the moment.
    */

    let dataIsValid = true;

    if (data.userInfo.name == "") {
      dataIsValid = false;

      window.alert("\"Name\" is required.");
    }

    if (!validator.isEmail(data.userInfo.email)) {
      dataIsValid = false;

      window.alert("That's not a valid e-mail address!  Who're you trying to kid?");
    }

    if (data.password == "") {
      dataIsValid = false;

      window.alert("You call that a password?  My mother can pick a better password than that!");
    }

    if (dataIsValid) {
      /*
      If the data is valid then send it off to the backend!
      */

      const options =  {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      }

      try {
        const response = await fetch(`${serverURL}/user`, options);
        const result = await response?.json();

        /*
        Finally, if the server successfully added the user to the database then
        set the user information context with all of the information available.
        If not then display an appropriate message.
        */

        if (response.ok && result?.userUID) {
          const newUserInfo = {
            userUID: result.userUID,
            name:    formElements.Name.value,
            email:   formElements.Email.value
          };

          setUserInfo(newUserInfo);
        }
        else if (response.status == 403) {
          window.alert("Registration failed.\n\nA user with these login credentials is already registered.");
        }
        else if (response.status == 406) {
          console.log(`HTTP response code 406 -- "${result?.msg}"`);
          window.alert("Registration failed.\n\nThe server couldn't make sense of the data that was sent to it.");
        }
        else if (response.status == 503) {
          window.alert("Registration failed.\n\nThe server couldn't access the database.");
        }
        else {
          console.log(`HTTP response code ${response.status} -- "${result?.msg}"`);
          window.alert("Registration failed.\n\nThis application is having a bad day.  Please reload or try again later.");
        }
      }
      catch(error) {
        window.alert("Registration failed.\n\nThe server could not be accessed.  Please try again later.");
      }
    }

    return;
  }

  /***************************************************************************/

  return (
    <form id="RegistrationForm" onSubmit={submit}>
      Name:<br />
      <input name="Name" type="text" /><br />
      E-mail Address:<br />
      <input name="Email" type="text" /><br />
      Password:<br />
      <input name="Password" type="password" /><br />

      <input type="submit" />
    </form>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export default LoginPage;
