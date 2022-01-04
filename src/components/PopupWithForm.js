import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, hanldeFormSubmit) {
    super(popupSelector)

    this._form = this._element.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this.hanldeFormSubmit = hanldeFormSubmit;

  }

  _getInputValues() {

    const res = {};

    for (let input of this._inputs) {
      res [input.name] = input.value;
    };

    return res;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
      const data = this._getInputValues();
      this.hanldeFormSubmit(data);
      this.close(evt);
    });

  }

  close() {
    super.close();
    this._form.reset();
  }

}
export default PopupWithForm;
