import { setDefaultEventHandlers } from "..";
import { openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const imagePopup = document.querySelector(".popup_type_image");
export const cardList = document.querySelector(".places__list");

export function createCard({ name, link, altText }, deleteCallback, imageClickCallback, likeCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = altText ?? `Очень информативный аттрибут alt (не знаю как лучше)`;
  cardElement.querySelector(".card__title").textContent = name;

  setDefaultEventHandlers(image, cardElement, deleteCallback, imageClickCallback, likeCallback)

  return cardElement;
}

export function handleLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function handleImageClick(event) {
  const imagePath = event.target.src;
  const imageElement = imagePopup.querySelector(".popup__image");
  const captionElement = imagePopup.querySelector(".popup__caption");

  imageElement.src = imagePath;
  captionElement.textContent = event.target.alt;

  openPopup(imagePopup);
}

export function deleteCard(element) {
  element.remove();
}

export function renderCard(cardData) {
  const cardElement = createCard(cardData, deleteCard, handleImageClick, handleLike);
  cardList.append(cardElement);
}
