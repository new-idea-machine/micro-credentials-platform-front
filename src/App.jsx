import './App.css'

const serverURL = "localhost:5001";

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

  const options =  {
    method: "POST",
    mode: "cors",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  }

  try {
    const response = await fetch(`${serverURL}/user`, options);
    const result = await response.json();

    if (response.ok) {
      window.alert(`Registration succeeded.\n\n"${data.userInfo.name}" is user "${result.userUID}".`);
    }
    else {
      window.alert(`Registration failed.\n\nReason:  ${response.status} -- ${response.statusText}`);
    }
  }
  catch(error)
  {
    window.alert(`Registration failed.\n\nReason:  ${error}`);
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
