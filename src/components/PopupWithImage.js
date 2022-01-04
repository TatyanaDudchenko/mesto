import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)

    this._imageIsOpened = this._element.querySelector('.popup__image-is-opened');
    this._descriptionIsOpened = this._element.querySelector('.popup__description-is-opened');
  }

  open(data) {
    this._imageIsOpened.src = data.link;
    this._imageIsOpened.alt = data.name;
    this._descriptionIsOpened.textContent = data.name;
    super.open();
  }

}

export default PopupWithImage;
