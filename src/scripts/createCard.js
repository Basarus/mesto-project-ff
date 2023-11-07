const cardTemplate = document.querySelector("#card-template").content;

export default function createCard({ name, link, altText }, deleteCallback) {
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
  
    return cardElement;
  }