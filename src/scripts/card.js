import { openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
export const imagePopup = document.querySelector(".popup_type_image");
const imageElement = imagePopup.querySelector(".popup__image");
const captionElement = imagePopup.querySelector(".popup__caption");
export const cardList = document.querySelector(".places__list");

export function createCard({
  cardData,
  deleteCallback,
  imageClickCallback,
  likeCallback,
}) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  image.src = cardData.link;
  image.alt =
    cardData.altText ?? `Очень информативный аттрибут alt (не знаю как лучше)`;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  setDefaultEventHandlers({
    image,
    cardElement,
    deleteCallback,
    imageClickCallback,
    likeCallback,
  });

  return cardElement;
}

export function handleLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function handleImageClick(event) {
  const imagePath = event.target.src;
  imageElement.src = imagePath;
  imageElement.alt =
    event.target.alt ?? `Очень информативный аттрибут alt (не знаю как лучше)`;
  captionElement.textContent = event.target.alt;

  openPopup(imagePopup);
}

export function deleteCard(element) {
  element.remove();
}

export function renderCard(cardData) {
  const cardElement = createCard({
    cardData,
    deleteCallback: deleteCard,
    imageClickCallback: handleImageClick,
    likeCallback: handleLike,
  });
  cardList.append(cardElement);
}

export function setDefaultEventHandlers({
  image,
  cardElement,
  deleteCallback,
  imageClickCallback,
  likeCallback,
}) {
  console.log(
    image,
    cardElement,
    deleteCallback,
    imageClickCallback,
    likeCallback,
  )
  const deleteCardButton = cardElement.querySelector(".card__delete-button");

  deleteCardButton.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCallback);

  image.addEventListener("click", imageClickCallback);
}
