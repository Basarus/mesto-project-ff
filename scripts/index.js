// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard({ name, link }) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;

  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  
  deleteCardButton.addEventListener("click", (e) => {
    deleteCard(e.target.parentNode)
  });

  return cardElement
}
// @todo: Функция удаления карточки
function deleteCard(element) {
    element.remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach(loadCards);

function loadCards(cardData) {
  const cardElement = createCard(cardData)
  cardList.append(cardElement);
}
