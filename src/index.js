import "./index.css";
import avatarImage from "./images/avatar.jpg";
import cardOneImage from "./images/card_1.jpg";
import cardTwoImage from "./images/card_2.jpg";
import cardThreeImage from "./images/card_3.jpg";
import createCard from "./scripts/createCard";
import deleteCard from "./scripts/deleteCard";
import renderCard from "./scripts/renderCards";
import { initialCards } from "./scripts/data/cards";

const editProfileButton = document.querySelector('.profile__edit-button');
const addImageButton = document.querySelector('.profile__add-button');

initialCards.forEach(renderCard);

editProfileButton.addEventListener('click', (evt) => {
  evt.preventDefault()
  const editProfileModal = document.querySelector('.popup_type_edit');
  editProfileModal.classList.add('popup_is-opened')

  document.addEventListener('click', (evt) => {
    if (Array.from(evt.target.classList).indexOf('popup') != -1)
    editProfileModal.classList.remove('popup_is-opened')
  })
  
  const closeButton = editProfileModal.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    editProfileModal.classList.remove('popup_is-opened')
  })

  const saveButton = editProfileModal.querySelector('.popup__button');

  saveButton.addEventListener('click', (evt) => {
    evt.preventDefault()
    const currentName = document.querySelector('.profile__title');
    const currentJob = document.querySelector('.profile__description');
    const editForm = document.forms['edit-profile'];
    const name = editForm.name.value;
    const job = editForm.description.value;
    currentName.textContent = name;
    currentJob.textContent = job;
    editProfileModal.classList.remove('popup_is-opened')
    editForm.reset()
  })

  document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        editProfileModal.classList.remove('popup_is-opened')
      };
  }); 

 
})
// .popup_is-opened // popup_is-animated // popup__close