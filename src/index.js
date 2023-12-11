import "./index.css";
import "./scripts/modal";
import { renderCard } from "./scripts/card";
import {
  closePopup,
  handleProfileFormSubmit,
  openPopup,
  handleCardFormSubmit,
  editForm,
  addCardForm,
  addPopup,
  editPopup,
  profileTitle,
  profileDescription,
  profileImage,
  updateAvatarForm,
  updateAvatarPopup,
  handleAvatarFormSubmit
} from "./scripts/modal";

import mesto from "./scripts/module/api";
import { clearValidation, enableValidation } from "./scripts/validation";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

editButton.addEventListener("click", () => {
  editForm.name.value = profileTitle.textContent;
  editForm.description.value = profileDescription.textContent;
  openPopup(editPopup);
});

addButton.addEventListener("click", () => openPopup(addPopup));
profileImage.addEventListener("click", () => openPopup(updateAvatarPopup));

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

editForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleCardFormSubmit);
updateAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

Promise.all([
  mesto.getUser(),
  mesto.getAllCards(),
]).then(values => {
  const [user, cards] = values;
  if (user){
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style["background-image"] = "url('" + user.avatar + "')";
  }
  if (cards) cards.forEach(renderCard)
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: ".popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
clearValidation(editForm, validationConfig);
clearValidation(addCardForm, validationConfig);

/**
 * Поздравляю с Новым годом!
 * Я конечно не мастер поздравлений, но считаю что могу дать немного положительных эмоций
 * Желаю что бы твой код с каждым днем становился все лучше и лучше, а багов появлялось все меньше и меньше
 * Здоровья всем кто дорог, богатства материального и духовного, исполнения всех метч
 * Как-то так, я говорил что не мастер поздравлений
 */
