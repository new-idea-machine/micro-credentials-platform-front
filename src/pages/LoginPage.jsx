import {useContext} from "react";
import validator from "validator";
import {UserContext} from "../contexts/UserContext";

const serverURL = import.meta.env.VITE_SERVER_URL_ROOT;

console.assert(serverURL?.length > 0, "Server URL not specified -- add \"VITE_SERVER_URL_ROOT=<url>\" to .env");

function LoginPage() {
  const {setUserInfo} = useContext(UserContext);

  async function submit(submitEvent) {
    submitEvent.preventDefault();

    const formElements = submitEvent.target.elements;
    const data = {
      userInfo: {
        name: formElements.Name.value,
        email: formElements.Email.value
      },
      password: formElements.Password.value,
      isInstructor:  false
    };

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
      const options =  {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      }

      try {
        const response = await fetch(`${serverURL}/user`, options);
        const result = await response?.json();

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
        else if (response.status < 500) {
          window.alert("Registration failed.\n\nThe server didn't like these login credentials.");
        }
        else {
          window.alert("Registration failed.\n\nThe server couldn't access the database.");
        }
      }
      catch(error) {
        window.alert(`Registration failed.\n\nThe server could not be accessed.`);
      }
    }

    return;
  }

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

export default LoginPage;
