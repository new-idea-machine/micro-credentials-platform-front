// ============================================================================================
// IMPORTS
// ============================================================================================

import { useContext, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext";
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

function Register({ credentials, setCredentials }) {
  const { setUserInfo } = useContext(UserContext);
  const [passwordIsValid, setPasswordIsValid] = useState();

  /*******************************************************************************************/

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
    First, get the information from the registration form and validate it.

    IMPORTANT NOTE:  As of this writing, what constitutes "valid data" hasn't been specified,
    so validation is rather limited at the moment.
    */

    const data = getFormData(submitEvent.target);
    let dataIsValid = true;

    data.isInstructor = data.isInstructor === "true";

    if (data.name === "") {
      dataIsValid = false;
      toast.error('"Name" is required.');
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

      headers.append("Authorization", `Basic ${btoa(credentials.email + ":" + data.password)}`);
      headers.append("Content-Type", "application/json");

      delete data.password;
      delete data.confirmPassword;

      const [response, result] = await sendRequest(
        "POST",
        `${serverURL}/auth`,
        headers,
        JSON.stringify(data)
      );

      /*
      Finally, if the server successfully added the user to the database then
      set the user information context with the relevant data so that the home
      page will be displayed.  If not then display an appropriate message.
      */

      if (response === null) {
        toast.error(
          "Registration failed.\n\nThe server could not be accessed.  Please try again later."
        );
      } else if (response.status === 403) {
        toast.error(
          "Registration failed.\n\nA user with these login credentials is already registered."
        );
      } else if (response.status === 406) {
        console.log(`HTTP response code 406 -- "${result?.msg}"`);
        toast.error(
          "Registration failed.\n\nThe server couldn't make sense of the data that was sent to it.  Please reload or try again later."
        );
      } else if (response.status === 504) {
        toast.error(
          "Registration failed.\n\nThe server couldn't access the database.  Please try again later."
        );
      } else if (!response.ok) {
        console.log(`HTTP response code ${response.status} -- "${result?.msg}"`);
        toast.error(
          "Registration failed.\n\nThis application is having a bad day.  Please reload or try again later."
        );
      } else if (result?.token_type !== "Bearer") {
        toast.error(
          "Registration may have failed.\n\nThe response from the server was not understood.  Please try logging in or try again later."
        );
      } else {
        const newUserInfo = result;

        newUserInfo.user_data = new User(newUserInfo.user_data);

        setUserInfo(newUserInfo);
      }
    }

    return;
  }

  /*******************************************************************************************/

  return (
    <>
      <h1>Are You a New User?</h1>
      <p>
        We&apos;re asking because <b>&quot;{credentials.email}&quot;</b> wasn&apos;t found in
        our list of registered users.
      </p>
      <hr />
      <p>
        If you are a new user then please complete your registration by filling in and
        submitting this form:
      </p>
      <form id="RegistrationForm" onSubmit={submit}>
        Name:
        <br />
        <input name="name" type="text" />
        <br />
        <InputNewPassword
          initialPassword={credentials ? credentials.password : ""}
          setPasswordIsValid={setPasswordIsValid}
        />
        <br />
        I am a:
        <br />
        <select name="isInstructor" defaultValue="false">
          <option value="false">Learner</option>
          <option value="true">Instructor</option>
        </select>
        <br />
        <br />
        <input type="submit" value="Register" />
      </form>
      <hr />
      <p>
        If you&apos;re sure that you&apos;re already registered then you can try using different
        credentials.
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

Register.propTypes = {
  credentials: PropTypes.object.isRequired,
  setCredentials: PropTypes.func.isRequired
};

// ============================================================================================
// EXPORTS
// ============================================================================================

export default Register;
