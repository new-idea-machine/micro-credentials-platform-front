import validator from "validator";

import './App.css'

const serverURL = import.meta.env.VITE_SERVER_URL_ROOT;

console.assert(serverURL?.length > 0, "Server URL not specified -- add \"VITE_SERVER_URL_ROOT=<url>\" to .env");

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

  // if (!emailValidator.test(data.userInfo.email)) {
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
      const result = (response?.bodyUsed ? await response?.json() : null);

      console.log(`New user id is ${result?.userUID}`);

      if (response.ok) {
        window.alert(`Registration succeeded.\n\n"${data.userInfo.name}" has been added to the database.`);
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

function App() {
  return (
    <>
      <form id="RegistrationForm" onSubmit={submit}>
        Name:<br />
        <input name="Name" type="text" /><br />
        E-mail Address:<br />
        <input name="Email" type="text" /><br />
        Password:<br />
        <input name="Password" type="password" /><br />

        <input type="submit" />
      </form>
    </>
  )
}

export default App
