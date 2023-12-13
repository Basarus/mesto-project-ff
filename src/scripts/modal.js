export function openPopup(popup, toggleEscEventHandler) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  toggleEscEventHandler("add");
}

export function closePopup(popup, toggleEscEventHandler) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  toggleEscEventHandler("remove");
}
