import {
  deleteCard,
  createCard,
  handleLike,
  handleImageClick,
  cardList,
} from "./card";

export const editForm = document.forms["edit-profile"];
export const addCardForm = document.forms["new-place"];

export const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_new-card");

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

export function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened"))
    closePopup(event.target);
}

export function closePopupOnEsc(event) {
  if (event.key === "Escape") 
    closePopup(document.querySelector(".popup_is-opened"));
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  toggleEscEventHandler("add");
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  toggleEscEventHandler("remove");
}

export function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = event.target.name.value;
  profileDescription.textContent = event.target.description.value;
  closePopup(editPopup);
}

export function handleCardFormSubmit(event) {
  event.preventDefault();

  const cardName = event.target["place-name"].value;
  const imageUrl = event.target["link"].value;

  const newCard = createCard({
    cardData: { name: cardName, link: imageUrl, altText: cardName },
    deleteCallback: deleteCard,
    imageClickCallback: handleImageClick,
    likeCallback: handleLike,
  });

  cardList.prepend(newCard);

  addCardForm.reset();
  closePopup(addPopup);
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
