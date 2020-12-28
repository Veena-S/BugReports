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
  submitButton.setAttribute('value', txtOnButton);
  submitButton.addEventListener('click', clickHandlerFn);
  divElement.appendChild(submitButton);
  return divElement;
};
