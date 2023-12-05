import { openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard({ name, link, altText }, deleteCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = altText;
  cardElement.querySelector(".card__title").textContent = name;
  const deleteCardButton = cardElement.querySelector(".card__delete-button");

  deleteCardButton.addEventListener("click", () => {
    deleteCallback(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLike);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
}

function handleLike(event) {
  const likeButton = event.target;
  if (!likeButton.classList.contains("card__like-button_is-active"))
    likeButton.classList.add("card__like-button_is-active");
  else likeButton.classList.remove("card__like-button_is-active");
}

function handleImageClick(event) {
  const imagePath = event.target.src;
  const imagePopup = document.querySelector(".popup_type_image");
  const imageElement = imagePopup.querySelector(".popup__image");
  const captionElement = imagePopup.querySelector(".popup__caption");

  imageElement.src = imagePath;
  captionElement.textContent = event.target.alt;

  openPopup(imagePopup);
}

export function deleteCard(element) {
  element.remove();
}

const cardList = document.querySelector(".places__list");

export function renderCard(cardData) {
  const cardElement = createCard(cardData, deleteCard);
  cardList.append(cardElement);
}
