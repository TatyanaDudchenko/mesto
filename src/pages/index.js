import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, settingsObjectMesto, gallerySelector, editPopup, addPopup, openEditPopupButton, openAddPopupButton, nameInput, jobInput, profileName, profileJob, titleInput, linkInput } from '../utils/constants';

// Функция для создания экземпляра карточки
function createCard(cardData, templateSelector, handleCardClick) {
  const cardElement = new Card(cardData, templateSelector, handleCardClick);
  return cardElement;
}

// Создаем экземпляр контейнера для карточек
const cardList = new Section({
  // передаем массив начальных карточек
    items: initialCards,
    // передаем функцию создания и отрисовки карточки
    renderer: (item) => {
      const card = createCard(item, '.template-card', hanldeOpenImageForm); // вызываем функцию создания нового экземпляра карточки и сохраняем результат в переменную
      const cardItem = card.createCard(); // отрисовываем карточку
      cardList.addItem(cardItem); // добавляем контейнер с карточкой на страницу
    }
  },
  // передаем селектор контейнера
  gallerySelector
);

// запускаем отрисовку карточек
cardList.renderItem();


// Создаем экземпляры попапов
const imageViewPopup = new PopupWithImage('.popup_type_img');
imageViewPopup.setEventListeners();

const formAdd = new PopupWithForm('.popup_type_add', hanldeNewCardFormSubmit);
formAdd.setEventListeners();

const formEdit = new PopupWithForm('.popup_type_edit', hanldeEditFormSubmit);
formEdit.setEventListeners();

// Создаем объект и экземпляр класса с данными пользователя
const configUserInfo = {
  nameItemSelector: '.profile__name',
  jobItemSelector: '.profile__job'
}
const profileUserInfo = new UserInfo(configUserInfo);


// Объявляем функцию открытия попапа редактирования
function openEditPopup() {

  // Формируем объект с данными пользователя
  const initialProfileUserData = profileUserInfo.getUserInfo();

  // Предарительно обновляем поля ввода
  nameInput.value = initialProfileUserData.name;
  jobInput.value = initialProfileUserData.job;

  // Предварительно очищаем ошибки валидации и деактивируем кнопку отправки формы
  editPopupValidator.resetValidation();
  // Открываем попап
  formEdit.open();
};
// Передаем в обработчик ссылку на функцию открытия попапа редактирования по клику кнопки Редактировать
openEditPopupButton.addEventListener('click', openEditPopup);

// Объявляем функцию открытия попапа добавления
function openAddPopup() {

  // Предварительно очищаем ошибки валидации и деактивируем кнопку отправки формы
  addPopupValidator.resetValidation();
  // Открываем попап
  formAdd.open();
};
// Передаем в обработчик ссылку на функцию открытия попапа добавления по клику кнопки Добавить
openAddPopupButton.addEventListener('click', openAddPopup);


// Обработчик «отправки» формы для редактирования профиля
function hanldeEditFormSubmit (evt) {
evt.preventDefault();

  const profileUserData = formEdit._getInputValues()

  profileUserInfo.setUserInfo(profileUserData);
}

// Обработчик формы для просмотра картинки
function hanldeOpenImageForm(data) {

  //Вызываем функцию открытия попапа Просмотр картинки
  imageViewPopup.open(data);
}

// Запускаем обработчик «отправки» формы для добавления новых карточек
function hanldeNewCardFormSubmit(evt) {
evt.preventDefault();

  const newCardData = formAdd._getInputValues();

  // создаем экземпляр новой карточки
  const newCard = createCard(newCardData, '.template-card', hanldeOpenImageForm); // вызываем функцию создания нового экземпляра карточки и сохраняем результат в переменную
  const newCardItem = newCard.createCard(newCardData); // отрисовываем карточку
  cardList.addItem(newCardItem); // добавляем контейнер с карточкой на страницу
};

const editPopupValidator = new FormValidator(settingsObjectMesto, editPopup);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(settingsObjectMesto, addPopup);
addPopupValidator.enableValidation();
