const validatePatterns = {
  text: {
    regexp: {
      value: /^[a-zA-Zа-яА-Я-_\s]+$/i,
      errorText:
        "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
    },
    minLength: { value: 5, errorText: "Минимальное количество символов 5" },
    maxLength: { value: 20, errorText: "Максимальное количество символов 20" },
  },
  url: {
    regexp: {
      value: /^(?:https?:\/\/)/,
      errorText: "Некорректно заполнен url-адрес",
    },
  },
};

export function enableValidation(validationConfig) {
  Array.from(document.querySelectorAll(validationConfig.formSelector)).forEach(
    (form) => {
      bindValidation(form, validationConfig);
    }
  );
}

function bindValidation(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const button = form.querySelector(validationConfig.submitButtonSelector);

  validateInputs(form, inputs, button, validationConfig);

  inputs.forEach((input) => {
    input.addEventListener("input", () => validateInputs(form, inputs, button, validationConfig));
  });
}

export function validateInputs(form, inputs, button, validationConfig) {
  let isValid = true;
  for (const input of inputs) {
    const pattern = validatePatterns[input.type];
    const errorText = validateInput(input, pattern);
    const errorForm = form.querySelector(
      `${validationConfig.inputErrorClass}-${input.name}`
    );
    if (errorText) {
      if (input.value !== "") {
        showCustomError(errorForm, errorText, validationConfig);
        input.style["border-bottom"] = "1px solid #FF0000";
      }
      isValid = false;
    } else {
      clearCustomError(errorForm, validationConfig);
      input.style["border-bottom"] = "1px solid rgba(0, 0, 0, .2)";
    }
  }

  button.disabled = !isValid;
  button.classList.toggle(validationConfig.inactiveButtonClass, !isValid);
}

function validateInput(input, pattern) {
  if (!pattern) return null;

  if (pattern.regexp && !pattern.regexp.value.test(input.value)) {
    return pattern.regexp.errorText;
  }

  if (pattern.minLength && input.value.length < pattern.minLength.value) {
    return pattern.minLength.errorText;
  }

  if (pattern.maxLength && input.value.length > pattern.maxLength.value) {
    return pattern.maxLength.errorText;
  }

  return null;
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
}
