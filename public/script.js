// To hold the form element for creating new bug
// This variable is made global, to support toggling
let divFormElement = null;
// To hold the list of newly created bugs.
let divNewBugsList = null;
// To hold the radio buttons for features
let divRadioGroupEl = null;

/**
 * Function to hide/show the form element to create new bug
 * @param {String} displayStyle - The style display property to be set on the element
 */
const clearAndToggleNewBugForm = (displayStyle) => {
  document.getElementById('problem-desc').value = '';
  document.getElementById('error-text').value = '';
  document.getElementById('git-commit').value = '';
  divFormElement.style.display = displayStyle;

  divRadioGroupEl.style.display = displayStyle;
};

const displayNewBugData = (bugData) => {
  if (divNewBugsList === null)
  {
    divNewBugsList = createAndAppendDivElement();
  }
  const pIDEl = document.createElement('p');
  pIDEl.innerHTML = `Id: ${bugData.id}`;
  divNewBugsList.appendChild(pIDEl);

  const pFeatureIDEl = document.createElement('p');
  pFeatureIDEl.innerHTML = `Feature Id: ${bugData.FeatureId}`;
  divNewBugsList.appendChild(pFeatureIDEl);

  const pProblemEl = document.createElement('p');
  pProblemEl.innerHTML = `Problem: ${bugData.problem}`;
  divNewBugsList.appendChild(pProblemEl);

  const pErrorEl = document.createElement('p');
  pErrorEl.innerHTML = `Error Text: ${bugData.errorText}`;
  divNewBugsList.appendChild(pErrorEl);

  const pCommitEl = document.createElement('p');
  pCommitEl.innerHTML = `Commit: ${bugData.commit}`;
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
  divRadioGroupEl = createAndAppendDivElement();
  divRadioGroupEl.classList.add('radio-toolbar');

  featuresList.forEach((singleFeature, index) => {
    // Creating the input radio button
    const radioElement = document.createElement('input');
    const radioID = `radio-${singleFeature.name}`;
    radioElement.setAttribute('type', 'radio');
    radioElement.setAttribute('name', 'radioFeature');
    radioElement.setAttribute('id', radioID);
    radioElement.setAttribute('value', singleFeature.id);
    if (index === 0)
    {
      radioElement.checked = true;
    }
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
    FeatureId: document.querySelector('input[name="radioFeature"]:checked').value,
  };
  console.log(data);
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
  if (divFormElement === null)
  {
    divFormElement = createAndAppendDivElement();
  }
  else {
    clearAndToggleNewBugForm('block');
    return divFormElement;
  }
  // When a form renders to create a bug,
  // make a request to the database to get the list of all features.
  getAllFeaturesElement();
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

if (isUserLoggedIn)
{
  const createABugButton = document.createElement('button');
  createABugButton.innerHTML = 'Create A Bug';
  document.body.appendChild(createABugButton);

  createABugButton.addEventListener('click', createNewBugForm);
}
