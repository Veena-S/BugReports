// To hold the form element for creating new bug
// This variable is made global, to support toggling
let divFormElement = null;
// To hold the list of newly created bugs.
let divNewBugsList = null;

/**
 * Function to create a new "div" element and returns the same.
 * It also appends the created div element to the document body.
 */
const createAndAppendDivElement = (data = '') => {
  const divElement = document.createElement('div');
  divElement.innerHTML = data;
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
 * Function to hide/show the form element to create new bug
 * @param {String} displayStyle - The style display property to be set on the element
 */
const clearAndToggleNewBugForm = (displayStyle) => {
  document.getElementById('problem-desc').value = '';
  document.getElementById('error-text').value = '';
  document.getElementById('git-commit').value = '';
  divFormElement.style.display = displayStyle;
};

const displayNewBugData = (bugData) => {
  if (divNewBugsList === null)
  {
    divNewBugsList = createAndAppendDivElement();
  }
  const pIDEl = document.createElement('p');
  pIDEl.innerHTML = `Id: ${bugData.id}`;
  divNewBugsList.appendChild(pIDEl);

  const pProblemEl = document.createElement('p');
  pProblemEl.innerHTML = `Problem: ${bugData.problem}`;
  divNewBugsList.appendChild(pProblemEl);

  const pErrorEl = document.createElement('p');
  pErrorEl.innerHTML = `Id: ${bugData.errorText}`;
  divNewBugsList.appendChild(pErrorEl);

  const pCommitEl = document.createElement('p');
  pCommitEl.innerHTML = `Id: ${bugData.commit}`;
  divNewBugsList.appendChild(pCommitEl);
};

/**
 * Function that displays the features as buttons.
 * Each feature is represented by a button.
 * Only one feature can be selected at a time.
 * This is achieved by using radio buttons and later by changing their appearance as buttons
 * When one feature is selected, it turns red.
 * All other feature selection buttons remain blue.
 *
 * @param {Array} featuresList - array of features to be displayed
 */
const displayFeatureButtons = (featuresList) => {
  // div element to gropu all the feature radio buttons
  const divRadioGroupEl = createAndAppendDivElement();
  divRadioGroupEl.classList.add('radio-toolbar');

  featuresList.forEach((singleFeature) => {
    // Creating the input radio button
    const radioElement = document.createElement('input');
    const radioID = `radio-${singleFeature.name}`;
    radioElement.setAttribute('type', 'radio');
    radioElement.setAttribute('name', 'radioFeature');
    radioElement.setAttribute('id', radioID);
    radioElement.setAttribute('value', singleFeature.id);
    divRadioGroupEl.appendChild(radioElement);

    // Creating the label for the radio button
    const radioLabelElement = document.createElement('label');
    radioLabelElement.setAttribute('for', radioID);
    radioLabelElement.innerText = singleFeature.name;
    divRadioGroupEl.appendChild(radioLabelElement);
  });
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
      console.log(`new bug id: ${response.data.id}`);
      console.log(`new bug problem: ${response.data.problem}`);
      console.log(`new bug error text: ${response.data.errorText}`);
      console.log(`new bug commit: ${response.data.commit}`);

      // After getting the response, hide the form elements and show the list of bugs
      clearAndToggleNewBugForm('none');
      displayNewBugData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Function to get all the features list from the server and
 * to create button representing each feature
 */
const getAllFeaturesElement = () => {
  axios.get('/getAllFeatures')
    .then((response) => {
      displayFeatureButtons(response.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

/**
 * Function to create all the elements to submit a new bug
 */
const createNewBugForm = () => {
  // When a form renders to create a bug,
  // make a request to the database to get the list of all features.
  const divFeatureElement = getAllFeaturesElement();

  if (divFormElement === null)
  {
    divFormElement = createAndAppendDivElement();
  }
  else {
    clearAndToggleNewBugForm('block');
    return divFormElement;
  }
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
