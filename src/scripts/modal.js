import {
  deleteCard,
  createCard,
  handleLike,
  cardList,
} from "./card";
import mesto from "./module/api";

export const editForm = document.forms["edit-profile"];
export const addCardForm = document.forms["new-place"];
export const updateAvatarForm = document.forms["update-avatar"];

export const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_new-card");
export const updateAvatarPopup = document.querySelector(
  ".popup_type_update-avatar"
);

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileImage = document.querySelector(".profile__image");

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

export async function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  toggleEscEventHandler("remove");
}

export function handleAvatarFormSubmit(event) {
  event.preventDefault();
  const button = event.target.querySelector(".popup__button")
  button.textContent = "Сохранение...";
  const imageUrl = event.target["link"].value;
  mesto.updateUserAvatar(imageUrl).then((res) => {
    if (!res) return;
    profileImage.style["background-image"] = "url('" + res.avatar + "')";
  }).catch((err) => {
    console.log(err)
  });
  button.textContent = "Сохранить"
  closePopup(updateAvatarPopup);
}

export function handleProfileFormSubmit(event) {
  event.preventDefault();
  const button = event.target.querySelector(".popup__button")
  button.textContent = "Сохранение...";
  mesto
    .updateUser(event.target.name.value, event.target.description.value)
    .then((res) => {
      if (!res) return;
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    }).catch((err) => {
      console.log(err)
    });
  button.textContent = "Сохранить"
  closePopup(editPopup);
}

export function handleCardFormSubmit(event, handleImageClick) {
  event.preventDefault();
  const button = event.target.querySelector(".popup__button")
  button.textContent = "Сохранение...";
  const cardName = event.target["place-name"].value;
  const imageUrl = event.target["link"].value;

  mesto.addNewCard(cardName, imageUrl).then((res) => {
    if (!res) return;
    const newCard = createCard({
      cardData: res,
      deleteCallback: deleteCard,
      imageClickCallback: handleImageClick,
      likeCallback: handleLike,
    });
    cardList.prepend(newCard);
    addCardForm.reset();
  }).catch((err) => {
    console.log(err)
  });
  button.textContent = "Сохранить"
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
