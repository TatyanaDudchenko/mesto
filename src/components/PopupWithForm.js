import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector)

    this._element = document.querySelector(popupSelector);
    this._form = this._element.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this.formSubmitHandler = formSubmitHandler;

  }

  _getInputValues() {
    const inputs = Array.from(this._inputs.value);

    const res = {};

    for (let input of inputs) {
      res [input.name] = input.value;
    };

    return res;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this.formSubmitHandler(evt);
      this.close(evt);
    });

  }

  close() {
    super.close();
    this._form.reset();
  }

}
export default PopupWithForm;
