function toggleEscEventHandler(action) {
  if (action === "add") {
    document.addEventListener("keydown", closePopupOnEsc);
    document.addEventListener("mousedown", closePopupOnOverlayClick);
  } else if (action === "remove") {
    document.removeEventListener("keydown", closePopupOnEsc);
    document.removeEventListener("mousedown", closePopupOnOverlayClick);
  }
}

function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains("popup_is-opened"))
    closePopup(event.target);
}

function closePopupOnEsc(event) {
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
