import "./index.css";
import "./scripts/modal";
import { renderCard, imagePopup } from "./scripts/card";
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
  handleAvatarFormSubmit,
} from "./scripts/modal";

import mesto from "./scripts/module/api";
import { clearValidation, enableValidation } from "./scripts/validation";

const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

editButton.addEventListener("click", () => {
  editForm.name.value = profileTitle.textContent;
  editForm.description.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openPopup(editPopup);
});

addButton.addEventListener("click", () => {
  clearValidation(addCardForm, validationConfig);
  openPopup(addPopup)
});
profileImage.addEventListener("click", () => {
  clearValidation(updateAvatarPopup, validationConfig);
  openPopup(updateAvatarPopup)
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

function handleImageClick(event) {
  const imagePath = event.target.src;
  imageElement.src = imagePath;
  imageElement.alt =
    event.target.alt ?? `Очень информативный аттрибут alt (не знаю как лучше)`;
  captionElement.textContent = event.target.alt;

  openPopup(imagePopup);
}

editForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", (event) => {
  handleCardFormSubmit(event, handleImageClick)
});
updateAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

Promise.all([
  mesto.getUser(),
  mesto.getAllCards(),
]).then(([user, cards]) => {
  if (user){
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style["background-image"] = "url('" + user.avatar + "')";
  }

  if (cards) cards.forEach((card) => {
    renderCard(card, handleImageClick)
  })
}).catch((error) => {
  console.log(error)
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

/**
 * Поздравляю с Новым годом!
 * Я конечно не мастер поздравлений, но считаю что могу дать немного положительных эмоций
 * Желаю что бы твой код с каждым днем становился все лучше и лучше, а багов появлялось все меньше и меньше
 * Здоровья всем кто дорог, богатства материального и духовного, исполнения всех метч
 * Как-то так, я говорил что не мастер поздравлений
 */
