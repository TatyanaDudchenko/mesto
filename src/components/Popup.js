class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._closePopupButton = this._element.querySelector('.popup__icon-close');
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(evt);
    };
  }

  setEventListeners() {
    this._closePopupButton.addEventListener('click', (evt) => {
      this.close(evt)
    });

    this._element.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
        this.close(evt.target);
      };
    });

  }

}

export default Popup;
