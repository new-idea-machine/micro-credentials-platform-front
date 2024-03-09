// ============================================================================
// IMPORTS
// ============================================================================

import {useContext} from "react";
import PropTypes from "prop-types";
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

function Register({credentials, setCredentials}) {
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
        email: credentials.email
      },
      password: formElements.Password.value,
      isInstructor:  formElements.IsInstructor.value
    };

    /*
    Next, before sending this information off, do some validation.

    IMPORTANT NOTE:  As of this writing, what constitutes "valid data" hasn't
    been specified, so validation is rather limited at the moment.
    */

    let dataIsValid = true;

    if (data.userInfo.name === "") {
      dataIsValid = false;

      window.alert("\"Name\" is required.");
    }

    if (data.password !== credentials.password) {
      dataIsValid = false;

      window.alert("That's not the same password!");
    }

    if (dataIsValid) {
      /*
      If the data is valid then send it off to the backend!
      */

      const [response, result] = await sendRequest("POST", `${serverURL}/user`,
                                 JSON.stringify(data), "application/json");

      /*
      Finally, if the server successfully added the user to the database then
      set the user information context with the relevant data so that the home
      page will be displayed.  If not then display an appropriate message.
      */

      if (response === null) {
        window.alert("Registration failed.\n\nThe server could not be accessed.  Please try again later.");
      }
      else if (response.status === 403) {
        window.alert("Registration failed.\n\nA user with these login credentials is already registered.");
      }
      else if (response.status === 406) {
        console.log(`HTTP response code 406 -- "${result?.msg}"`);
        window.alert("Registration failed.\n\nThe server couldn't make sense of the data that was sent to it.  Please reload or try again later.");
      }
      else if (response.status === 503) {
        window.alert("Registration failed.\n\nThe server couldn't access the database.  Please try again later.");
      }
      else if (!response.ok) {
        console.log(`HTTP response code ${response.status} -- "${result?.msg}"`);
        window.alert("Registration failed.\n\nThis application is having a bad day.  Please reload or try again later.");
      }
      else if (!result?.userUID) {
        window.alert("Registration may have failed.\n\nThe response from the server was not understood.");
      }
      else {
        const newUserInfo = {
          userUID: result.userUID,
          name:    formElements.Name.value,
          email:   credentials.email
        };

        setUserInfo(newUserInfo);
      }
    }

    return;
  }

  /***************************************************************************/

  return (
    <>
      <h1>Are You a New User?</h1>

      <p>
        We&apos;re asking because
        {" "}<b>&quot;{credentials.email}&quot;</b> wasn&apos;t found in our
        list of registered users.
      </p>

      <hr />

      <p>
        If you are a new user then please complete your registration by
        filling in and submitting this form:
      </p>

      <form id="RegistrationForm" onSubmit={submit}>
        Name:<br />
        <input name="Name" type="text" /><br />
        Password (again):<br />
        <input name="Password" type="password" /><br />
        I am a:<br />
        <select name="IsInstructor" defaultValue="false">
          <option value="false">Learner</option>
          <option value="true">Instructor</option>
        </select><br />
        <br />
        <input type="submit" value="Register" />
      </form>

      <hr />

      <p>
        If you&apos;re sure that you&apos;re already registered then you can
        try using different credentials.
      </p>

      <button onClick={() => setCredentials(null)}>
        Go back to login screen.
      </button>
    </>
  )
}

Register.propTypes = {
  credentials:     PropTypes.object.isRequired,
  setCredentials:  PropTypes.func.isRequired
};

// ============================================================================
// EXPORTS
// ============================================================================

export default Register;
