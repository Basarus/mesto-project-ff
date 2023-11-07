import createCard from "./createCard";
import deleteCard from "./deleteCard";
const cardList = document.querySelector(".places__list");

export default function renderCard(cardData) {
  const cardElement = createCard(cardData, deleteCard);
  cardList.append(cardElement);
}
