class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject; // settingsObject {...}
    this._formElement = formElement;
    // Находим все поля ввода
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settingsObject.inputSelector));
    // Находим кнопку отправки формы
    this._buttonElement = this._formElement.querySelector(this._settingsObject.submitButtonSelector);
  };

  enableValidation() {
    this._setEventListeners();
  };

  _setEventListeners() {
    // Предварительно деактивируем кнопку отправки формы, прежде чем ее начнут заполнять, путем запуска функции переключения состояния кнопки перед обработчиком событий ввода
    this._toggleButtonState();

    // Запускаем обработчик событий ввода с запуском функций, отвечающих за валидность вводимых элементов и состояние кнопки отправки
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState();
      });
    });

    // Устанавливаем на форму слушатель по событию отправки формы
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  };

  // Метод для очистки ошибок в полях ввода и управления кнопкой отправки
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

  }

  // Метод показа ошибки ввода
  _showInputError(inputElement, errorMessage) {
    // Находим элемент сообщения об ошибке по уникальному классу
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Добавляем полю ввода класс показа ошибки ввода
    inputElement.classList.add(this._settingsObject.inputErrorClass);
    // Передаем значение ошибки в текстовое значение элемента сообщения об ошибке
    errorElement.textContent = errorMessage;
    // Добавляем элементу сообщения об ошибке активизирующий его класс
    errorElement.classList.add(this._settingsObject.errorClass);
  };

  // Метод скрытия ошибки ввода
  _hideInputError(inputElement) {
    // Находим элемент сообщения об ошибке по уникальному классу
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    // Удаляем у поля ввода класс показа ошибки ввода
    inputElement.classList.remove(this._settingsObject.inputErrorClass);
    // Удаляем у элемента сообщения об ошибке активизирующий его класс
    errorElement.classList.remove(this._settingsObject.errorClass);
    // Очищаем текстовое значение элемента сообщения об ошибке
    errorElement.textContent = '';
  };

  // Метод проверки на валидность элемента, вводимого в поле ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Метод проверки на наличие хотя бы одного невалидного поля в форме
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Метод переключения состояния кнопки отправки формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settingsObject.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._settingsObject.inactiveButtonClass);
    };
  };

}

export {FormValidator};
