import "./index.css";
import avatarImage from "./images/avatar.jpg";
import cardOneImage from "./images/card_1.jpg";
import cardTwoImage from "./images/card_2.jpg";
import cardThreeImage from "./images/card_3.jpg";
import { initialCards } from "./scripts/data/cards";
import "./scripts/modal";
import { renderCard } from "./scripts/card";
import {
  closePopup,
  editFormHandleSubmit,
  openPopup,
  addCardFormHandleSubmit,
  editForm,
  addCardForm
} from "./scripts/modal";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const imageElement = document.querySelector(".profile__image");

export const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_new-card");
export const imagePopup = document.querySelector(".popup_type_image");

const closeButtons = document.querySelectorAll(".popup__close");

editButton.addEventListener("click", () => openPopup(editPopup, "editProfile"));
addButton.addEventListener("click", () => openPopup(addPopup, "addCard"));
imageElement.addEventListener("click", () =>
  openPopup(imagePopup, "imagePopup")
);

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

editForm.addEventListener("submit", editFormHandleSubmit);
addCardForm.addEventListener("submit", addCardFormHandleSubmit);

initialCards.forEach(renderCard);

/**
 * Поздравляю с Новым годом! 
 * Я конечно не мастер поздравлений, но считаю что могу дать немного положительных эмоций
 * Желаю что бы твой код с каждым днем становился все лучше и лучше, а багов появлялось все меньше и меньше
 * Здоровья всем кто дорог, богатства материального и духовного, исполнения всех метч
 * Как-то так, я говорил что не мастер поздравлений
 */