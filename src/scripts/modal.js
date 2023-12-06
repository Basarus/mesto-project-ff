import { addPopup, editPopup, toggleEscEventHandler } from "..";
import {
  deleteCard,
  createCard,
  handleLike,
  handleImageClick,
  cardList
} from "./card";

export const editForm = document.forms["edit-profile"];
export const addCardForm = document.forms["new-place"];

let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(
  ".profile__description"
);

export function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened"))
    closePopup(event.target, "remove");
}

export function closePopupOnEsc(event) {
  if (event.key === "Escape") closePopup(event.target, "remove");
}

export function openPopup(popup, type) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  if (type === "editProfile") {
    editForm.name.value = profileTitle.textContent;
    editForm.description.value = profileDescription.textContent;
  }
  toggleEscEventHandler("add");
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  toggleEscEventHandler("remove");
}

export function editFormHandleSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = event.target.name.value;
  profileDescription.textContent = event.target.description.value;
  closePopup(editPopup);
}

export function addCardFormHandleSubmit(event) {
  event.preventDefault();

  const cardName = event.target["place-name"].value;
  const imageUrl = event.target["link"].value;

  const newCard = createCard(
    { name: cardName, link: imageUrl, altText: cardName },
    deleteCard,
    handleImageClick,
    handleLike
  );

  cardList.prepend(newCard);

  addCardForm.reset();
  closePopup(addPopup);
}
