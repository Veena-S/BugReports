const divLoginFormElement = createAndAppendDivElement();
document.body.appendChild(divLoginFormElement);

const emailEl = createInputTextElement('Email: ', 'email');
divLoginFormElement.appendChild(emailEl);

const passwordEl = createInputTextElement('Password: ', 'password');
divLoginFormElement.appendChild(passwordEl);

/**
 * Function to post the sign-up or login request
 * @param {boolean} login - false, if the request is for signup
 *                        - true, for login. Default value
 */
const requestLogin = (login = true) => {
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  console.log(data);
  if (!login) // signup request
  {
    axios.post('/sign-up', data)
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  else {
    axios.post('/login', data)
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// Create the Submit button
const signupEl = createSubmitButton('Sign-up', () => {
  requestLogin(false);
});
divLoginFormElement.appendChild(signupEl);
const loginEl = createSubmitButton('Login', requestLogin);
divLoginFormElement.appendChild(loginEl);
