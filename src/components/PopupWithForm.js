import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, hanldeFormSubmit) {
    super(popupSelector)

    this._form = this._element.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this.hanldeFormSubmit = hanldeFormSubmit;
    this._submitButton = this._form.querySelector('.popup__button');
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
    });

  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(submitButtonText) {
    this._submitButton.textContent = submitButtonText;
  }

  // методы, предотвращающие баг - чтобы кнопка submit блокировалась сразк после 1 нажатия (чтобы нельзя было отправить информацию несколько раз)
  setDisabling() {
    this._submitButton.setAttribute('disabled', true);
  }

  removeDisabling() {
    this._submitButton.removeAttribute('disabled');
  }


}
export default PopupWithForm;
