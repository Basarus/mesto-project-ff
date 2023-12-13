import "./index.css";
import "./scripts/modal";
import {
  renderCard,
  imagePopup,
  createCard,
  deleteCard,
  updateCard,
  cardList,
} from "./scripts/card";
import { closePopup, openPopup } from "./scripts/modal";

import mesto from "./scripts/module/api";
import { clearValidation, enableValidation } from "./scripts/validation";

const editForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];
const updateAvatarForm = document.forms["update-avatar"];

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const updateAvatarPopup = document.querySelector(".popup_type_update-avatar");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");

editButton.addEventListener("click", () => {
  editForm.name.value = profileTitle.textContent;
  editForm.description.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openPopup(editPopup, toggleEscEventHandler);
});

addButton.addEventListener("click", () => {
  clearValidation(addCardForm, validationConfig);
  openPopup(addPopup, toggleEscEventHandler);
});
profileImage.addEventListener("click", () => {
  clearValidation(updateAvatarPopup, validationConfig);
  openPopup(updateAvatarPopup, toggleEscEventHandler);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup, toggleEscEventHandler);
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

function handleAvatarFormSubmit(event) {
  event.preventDefault();
  const button = event.target.querySelector(".popup__button");
  button.textContent = "Сохранение...";
  const imageUrl = event.target["link"].value;
  mesto
    .updateUserAvatar(imageUrl)
    .then((res) => {
      if (!res) return;
      profileImage.style["background-image"] = "url('" + res.avatar + "')";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
      closePopup(updateAvatarPopup, toggleEscEventHandler);
    });
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const button = event.target.querySelector(".popup__button");
  button.textContent = "Сохранение...";
  mesto
    .updateUser(event.target.name.value, event.target.description.value)
    .then((res) => {
      if (!res) return;
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
      closePopup(editPopup, toggleEscEventHandler);
    });
}

function handleCardFormSubmit(event, handleImageClick) {
  event.preventDefault();
  const button = event.target.querySelector(".popup__button");
  button.textContent = "Сохранение...";
  const cardName = event.target["place-name"].value;
  const imageUrl = event.target["link"].value;

  mesto
    .addNewCard(cardName, imageUrl)
    .then((res) => {
      if (!res) return;
      const newCard = createCard({
        cardData: res,
        deleteCallback: deleteCard,
        imageClickCallback: handleImageClick,
        likeCallback: handleLike,
      });
      cardList.prepend(newCard);
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
      closePopup(addPopup, toggleEscEventHandler);
    });
}

function handleLike(event) {
  mesto
    .setLikeCard(
      event.target.closest(".places__item").id,
      !event.target.classList.contains("card__like-button_is-active")
    )
    .then((res) => {
      event.target.classList.toggle("card__like-button_is-active");
      updateCard(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

function toggleEscEventHandler(action) {
  if (action === "add") {
    document.addEventListener("keydown", closePopupOnEsc);
    document.addEventListener("mousedown", closePopupOnOverlayClick);
  } else if (action === "remove") {
    document.removeEventListener("keydown", closePopupOnEsc);
    document.removeEventListener("mousedown", closePopupOnOverlayClick);
  }
}

function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened"))
    closePopup(event.target, toggleEscEventHandler);
}

function closePopupOnEsc(event) {
  if (event.key === "Escape")
    closePopup(
      document.querySelector(".popup_is-opened"),
      toggleEscEventHandler
    );
}

editForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", (event) => {
  handleCardFormSubmit(event, handleImageClick);
});
updateAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

Promise.all([mesto.getUser(), mesto.getAllCards()])
  .then(([user, cards]) => {
    if (user) {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      profileImage.style["background-image"] = "url('" + user.avatar + "')";
    }

    if (cards)
      cards.forEach((cardData) => {
        renderCard({ cardData, handleImageClick, handleLike });
      });
  })
  .catch((error) => {
    console.log(error);
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
