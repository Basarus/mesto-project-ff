import "./index.css";
import avatarImage from "./images/avatar.jpg";
import cardOneImage from "./images/card_1.jpg";
import cardTwoImage from "./images/card_2.jpg";
import cardThreeImage from "./images/card_3.jpg";
import { initialCards } from "./scripts/data/cards";
import "./scripts/modal";
import { renderCard,imagePopup } from "./scripts/card";
import {
  closePopup,
  handleProfileFormSubmit ,
  openPopup,
  handleCardFormSubmit ,
  editForm,
  addCardForm,
  addPopup,
  editPopup,
  profileTitle,
  profileDescription
} from "./scripts/modal";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const imageElement = document.querySelector(".profile__image");
const closeButtons = document.querySelectorAll(".popup__close");

editButton.addEventListener("click", () => {
  editForm.name.value = profileTitle.textContent;
  editForm.description.value = profileDescription.textContent;
  openPopup(editPopup);
});

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

editForm.addEventListener("submit", handleProfileFormSubmit );
addCardForm.addEventListener("submit", handleCardFormSubmit );

initialCards.forEach(renderCard);

/**
 * Поздравляю с Новым годом!
 * Я конечно не мастер поздравлений, но считаю что могу дать немного положительных эмоций
 * Желаю что бы твой код с каждым днем становился все лучше и лучше, а багов появлялось все меньше и меньше
 * Здоровья всем кто дорог, богатства материального и духовного, исполнения всех метч
 * Как-то так, я говорил что не мастер поздравлений
 */
