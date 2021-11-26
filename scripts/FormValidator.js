class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject; // settingsObject {...}
    this._formElement = formElement;
  };

  enableValidation() {
    this._setEventListeners();
  };

  _setEventListeners() {
    // Находим все поля ввода
    const inputList = Array.from(this._formElement.querySelectorAll(this._settingsObject.inputSelector));
    // Находим и предварительно дезактивируем кнопку отправки формы, прежде чем ее начнут заполнять, путем запуска функции переключения состояния кнопки перед обработчиком событий ввода
    const buttonElement = this._formElement.querySelector(this._settingsObject.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    // Запускаем обработчик событий ввода с запуском функций, отвечающих за валидность вводимых элементов и состояние кнопки отправки
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);

        this._toggleButtonState(inputList, buttonElement);
      });
    });

    // Устанавливаем на форму слушатель по событию отправки формы
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  };

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
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Метод переключения состояния кнопки отправки формы
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settingsObject.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._settingsObject.inactiveButtonClass);
    };
  };

}

export {FormValidator};
