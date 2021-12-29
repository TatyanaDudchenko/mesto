import Popup from "./Popup.js";

class PopupWithImage extends Popup {

  open(data) {
    document.querySelector('.popup__image-is-opened').src = data.link;
    document.querySelector('.popup__image-is-opened').alt = data.name;
    document.querySelector('.popup__description-is-opened').textContent = data.name;
    super.open();
  }

}

export default PopupWithImage;
