/**
 * Function to create a new "div" element and returns the same.
 * It also appends the created div element to the document body.
 */
const createAndAppendDivElement = () => {
  const divElement = document.createElement('div');
  document.body.appendChild(divElement);
  return divElement;
};

/**
 * A utility function to create input text elements including labels, in a div element
 * @param {string} labelName - Text to be set as label value
 * @param {string} inputIdName - Value of ID to set for the input text element
 */
const createInputTextElement = (labelName, inputIdName) => {
  const divElement = createAndAppendDivElement();
  // Label
  const labelElement = document.createElement('label');
  labelElement.innerHTML = labelName;
  divElement.appendChild(labelElement);
  // Input text
  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('id', inputIdName);
  labelElement.appendChild(inputElement);
  return divElement;
};

/**
 * Utility function to create a submit button and appends it to the body
 * Function returns the created submit button.
 *
 * @param {string} txtOnButton - Text to be set on the button
 * @param {Function} clickHandlerFn - Function to be passed to addEventListener
 */
const createSubmitButton = (txtOnButton, clickHandlerFn) => {
  const divElement = createAndAppendDivElement();
  const submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.innerText = txtOnButton;
  submitButton.addEventListener('click', clickHandlerFn);
  divElement.appendChild(submitButton);
  return divElement;
};

/**
 * Function that post the info on new bug to the server using Axios
 */
const postNewBug = () => {
  console.log('inside postNewBug');
  // Create the data to send
  const data = {
    problem: document.getElementById('problem-desc').value,
    errorText: document.getElementById('error-text').value,
    commit: document.getElementById('git-commit').value,
  };

  // Make the POST request to create the Bug
  axios.post('/createBug', data)
    .then((response) => {
      console.log(`Response: ${response.data}`);
      console.log(`new bug id: ${response.data.id}`);
      console.log(`new bug problem: ${response.data.problem}`);
      console.log(`new bug error text: ${response.data.errorText}`);
      console.log(`new bug commit: ${response.data.commit}`);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);

      // After getting the response, hide the form elements and show the list of bugs
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Function to create all the elements to submit a new bug
 */
const createNewBugForm = () => {
  const divFormElement = createAndAppendDivElement();
  // Create problem elemet
  const problemEl = createInputTextElement('Problem: ', 'problem-desc');
  divFormElement.appendChild(problemEl);
  // Create Error text
  const errorEl = createInputTextElement('Error Output: ', 'error-text');
  divFormElement.appendChild(errorEl);
  // Create Commit element
  const commitEl = createInputTextElement('Commit (if any ): ', 'git-commit');
  divFormElement.appendChild(commitEl);

  // Create the Submit button
  const submitEl = createSubmitButton('Create A Bug', postNewBug);
  divFormElement.appendChild(submitEl);

  return divFormElement;
};

const createABugButton = document.createElement('button');
createABugButton.innerHTML = 'Create A Bug';
document.body.appendChild(createABugButton);

createABugButton.addEventListener('click', createNewBugForm);
