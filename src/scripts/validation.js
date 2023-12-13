export function enableValidation(validationConfig) {
  Array.from(document.querySelectorAll(validationConfig.formSelector)).forEach(
    (form) => {
      bindValidation(form, validationConfig);
    }
  );
}

function toggleButtonState(inputList, button, validationConfig) {
  const isValid = Array.from(inputList).every((inputElement) => {
    return inputElement.validity.valid;
  });
  button.disabled = !isValid;
  button.classList.toggle(validationConfig.inactiveButtonClass, !isValid);
}

function bindValidation(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const button = form.querySelector(validationConfig.submitButtonSelector);

  inputs.forEach((input) => {
    const customValidationNames = ["name", "description", "place-name"];
    if (customValidationNames.indexOf(input.name) !== -1)
      input.setAttribute(
        "data-error",
        "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
      );

    input.addEventListener("input", () => {
      checkInputValidity(form, input, validationConfig);
      toggleButtonState(inputs, button, validationConfig);
    });
  });
}

function checkInputValidity(form, input, validationConfig) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.error);
  } else {
    input.setCustomValidity("");
  }
  const errorText = input.validationMessage;
  const errorForm = form.querySelector(
    `${validationConfig.inputErrorClass}-${input.name}`
  );

  if (!input.validity.valid)
    showCustomError(errorForm, errorText, validationConfig);
  else clearCustomError(errorForm, validationConfig);
}

function showCustomError(errorForm, message, validationConfig) {
  if (errorForm) {
    errorForm.classList.add(validationConfig.errorClass);
    errorForm.textContent = message;
  }
}

function clearCustomError(errorForm, validationConfig) {
  errorForm.classList.remove(validationConfig.errorClass);
  errorForm.textContent = "";
}

export function clearValidation(form, validationConfig) {
  const errorsForm = form.querySelectorAll(validationConfig.inputErrorClass);
  Array.from(errorsForm).forEach(clearCustomError);
  const button = form.querySelector(".button");
  button.disabled = true;
  button.classList.toggle(validationConfig.inactiveButtonClass, true);
}
