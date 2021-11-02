// Объявляем объект настроек валидации
const settingsObjectMesto = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Функция показа ошибки ввода
const showInputError = (formElement, inputElement, errorMessage, settingsObject) => {
  // Находим элемент сообщения об ошибке по уникальному классу
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Добавляем полю ввода класс показа ошибки ввода
  inputElement.classList.add(settingsObject.inputErrorClass);
  // Передаем значение ошибки в текстовое значение элемента сообщения об ошибке
  errorElement.textContent = errorMessage;
  // Добавляем элементу сообщения об ошибке активизирующий его класс
  errorElement.classList.add(settingsObject.errorClass);
};

// Функция скрытия ошибки ввода
const hideInputError = (formElement, inputElement, settingsObject) => {
  // Находим элемент сообщения об ошибке по уникальному классу
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Удаляем у поля ввода класс показа ошибки ввода
  inputElement.classList.remove(settingsObject.inputErrorClass);
  // Удаляем у элемента сообщения об ошибке активизирующий его класс
  errorElement.classList.remove(settingsObject.errorClass);
  // Очищаем текстовое значение элемента сообщения об ошибке
  errorElement.textContent = '';
};

// Функция проверки на валидность элемента, вводимого в поле ввода
const checkInputValidity = (formElement, inputElement, settingsObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject);
  } else {
    hideInputError(formElement, inputElement, settingsObject);
  }
};

// Функция проверки на наличие хотя бы одного невалидного поля в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция переключения состояния кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, settingsObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
  };
};

// Функция перебора всех полей форм с запуском функций, отвечающих за валидность вводимых элементов и состояние кнопки отправки
const setEventListeners = (formElement, settingsObject) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
  const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
  // Предварительно дезактивируем кнопку отправки формы, прежде чем ее начнут заполнять, путем запуска функции переключения состояния кнопки перед обработчиком событий ввода
  toggleButtonState(inputList, buttonElement, settingsObject);

  // Запускаем обработчик событий ввода с запуском функций, отвечающих за валидность вводимых элементов и состояние кнопки отправки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settingsObject);

      toggleButtonState(inputList, buttonElement, settingsObject);
    });
  });
};

// Функция включения валидации всех форм
const enableValidation = (settingsObject) => {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, settingsObject);
  });
};

// Включение валидации вызовом enableValidation
// Все настройки передаются при вызове
enableValidation(settingsObjectMesto);

