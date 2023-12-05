import {deleteCard, createCard} from "./card";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const imageElement = document.querySelector(".profile__image");

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const closeButtons = document.querySelectorAll(".popup__close");

editButton.addEventListener("click", () => openPopup(editPopup));
addButton.addEventListener("click", () => openPopup(addPopup));
imageElement.addEventListener("click", () => openPopup(imagePopup));

const editForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

const popups = document.querySelectorAll(".popup");

function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    event.target.classList.remove("popup_is-opened");
  }
}

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOnOverlayClick);
});

function closePopupOnEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_is-opened");
    }
  }
}

function toggleEscEventHandler(action) {
  if (action === "add") {
    document.addEventListener("keydown", closePopupOnEsc);
  } else if (action === "remove") {
    document.removeEventListener("keydown", closePopupOnEsc);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  toggleEscEventHandler("add");
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  toggleEscEventHandler("remove");
}

editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  document.querySelector(".profile__title").textContent =
    event.target.name.value;
  document.querySelector(".profile__description").textContent =
    event.target.description.value;
  closePopup(editPopup);
});

addCardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const cardName = event.target["place-name"].value;
  const imageUrl = event.target["link"].value;

  const newCard = createCard(
    { name: cardName, link: imageUrl, altText: cardName },
    deleteCard
  );

  const cardList = document.querySelector(".places__list");
  cardList.prepend(newCard);

  addCardForm.reset();
  closePopup(addPopup);
});
