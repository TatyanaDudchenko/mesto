import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, settingsObjectMesto, gallerySelector, editPopup, addPopup, openEditPopupButton, openAddPopupButton, nameInput, jobInput, profileName, profileJob, titleInput, linkInput } from '../utils/constants';

// Функция создания карточки
function createCard(item) {
  const cardElement = new Card(item, '.template-card', hanldeOpenImageForm); // создаем новый экземпляр карточки
  const card = cardElement.createCard(); // отрисовываем карточку
  return card;
}

// Создаем экземпляр контейнера для карточек
const cardList = new Section({
  // передаем массив начальных карточек
    items: initialCards,
    // передаем функцию создания и отрисовки карточки
    renderer: (item) => {
      const cardItem = createCard(item); // вызываем функцию создания карточки и сохраняем результат в переменную
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
  const {name, job} = profileUserInfo.getUserInfo();

  // Предарительно обновляем поля ввода
  nameInput.value = name;
  jobInput.value = job;

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
function hanldeEditFormSubmit(data) {

  profileUserInfo.setUserInfo(data);
}

// Обработчик формы для просмотра картинки
function hanldeOpenImageForm(data) {

  //Вызываем функцию открытия попапа Просмотр картинки
  imageViewPopup.open(data);
}

// Запускаем обработчик «отправки» формы для добавления новых карточек
function hanldeNewCardFormSubmit(data) {

  const newCardItem = createCard(data); // вызываем функцию создания карточки и сохраняем результат в переменную
  cardList.addItem(newCardItem); // добавляем контейнер с карточкой на страницу
};

const editPopupValidator = new FormValidator(settingsObjectMesto, editPopup);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(settingsObjectMesto, addPopup);
addPopupValidator.enableValidation();
