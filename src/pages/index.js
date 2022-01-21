import Api from '../components/Api.js';
import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithСonfirm from '../components/PopupWithСonfirm.js';
import UserInfo from '../components/UserInfo.js';

import { settingsObjectMesto, settingsObjectCard, configUserInfo, gallerySelector, editPopup, addPopup, editAvatarPopup, openEditPopupButton, openAddPopupButton, openEditAvatarPopupButton, nameInput, jobInput } from '../utils/constants';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: '00d03ff0-290d-430c-82a1-6d959f58942a',
});

let currentUserData;

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, items]) => {
    profileUserInfo.setUserInfo(userData);
    profileUserInfo.setAvatar(userData);
    cardList.renderItem(items, userData);
    currentUserData = userData;
  })
  .catch((err) => {
    console.log(err);
  });


// Создаем экземпляр попапа с формой подтверждения
const confirmForm = new PopupWithСonfirm(
  '.popup_type_confirm',
  function deleteCard(item) {
    api.deleteCard(item)
    .then(result => item.deleteCard(result))
    .catch((err) => {
      console.log(err);
    });
  }
  )
confirmForm.setEventListeners();


// Функция создания карточки
const createCard = (item, currentUserData) => {
  const cardElement = new Card(
    settingsObjectCard,
    item,
    '.template-card',
    hanldeOpenImageForm,

    function handleCardDelete(itemId) {
      confirmForm.open();
      confirmForm.setSubmitHandler(function deleteCard() {
        api.deleteCard(itemId)
        .then(result => cardElement.deleteCard(result))
        .catch((err) => {
          console.log(err);
        });
      });
    },

    function handlePutLike(itemId) {
      api.putLike(itemId)
      .then(result => cardElement.likesCounter(result))
      .then(() => cardElement.toggleLike())
      .catch((err) => {
        console.log(err);
      });
    },

    function handleDeleteLike(itemId) {
      api.deleteLike(itemId)
      .then(result => cardElement.likesCounter(result))
      .then(() => cardElement.toggleLike())
      .catch((err) => {
        console.log(err);
      });
    },

    currentUserData
  );
  return cardElement.createCard(); // отрисовываем карточку
}


// Создаем экземпляр контейнера для карточек
const cardList = new Section({
  renderer: (item, currentUserData) => {
    cardList.addItem(createCard(item, currentUserData));
  }
}, gallerySelector)


// Создаем экземпляр попапа с формой добавления
const formAdd = new PopupWithForm(
  '.popup_type_add',

    function hanldeNewCardFormSubmit(data) {
      formAdd.loading('Сохранение...')
      api.createNewCard(data)
      .then(result => cardList.addItem(createCard(result, currentUserData)))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => formAdd.loading('Сохранить'))
    }

)
formAdd.setEventListeners();



// Создаем экземпляр попапа с формой редактирования профиля
const formEdit = new PopupWithForm(
  '.popup_type_edit',

    function hanldeEditFormSubmit(userData) {
      formEdit.loading('Сохранение...')
      api.editProfile(userData)
      .then(result => profileUserInfo.setUserInfo(result))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => formEdit.loading('Сохранить'))
    }

)
formEdit.setEventListeners();

// Создаем экземпляр попапа с формой редактирования аватара
const formEditAvatar = new PopupWithForm(
  '.popup_type_edit-avatar',

    function hanldeEditAvatarFormSubmit(avatarData) {
      formEditAvatar.loading('Сохранение...')
      api.updatedAvatar(avatarData)
      .then(result => profileUserInfo.setAvatar(result))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => formEditAvatar.loading('Сохранить'))
    }

)
formEditAvatar.setEventListeners();


// Создаем экземпляр попапа просмотра картинки
const imageViewPopup = new PopupWithImage('.popup_type_img');
imageViewPopup.setEventListeners();


const profileUserInfo = new UserInfo(configUserInfo);


// Объявляем функцию открытия попапа редактирования
function openEditPopup() {

  // Формируем объект с данными пользователя
  const {name, about} = profileUserInfo.getUserInfo();

  // Предарительно обновляем поля ввода
  nameInput.value = name;
  jobInput.value = about;

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


// Объявляем функцию открытия попапа редактирования аватара
function openEditAvatarPopup() {

  // Предварительно очищаем ошибки валидации и деактивируем кнопку отправки формы
  editAvatarPopupValidator.resetValidation();
  // Открываем попап
  formEditAvatar.open();
};
// Передаем в обработчик ссылку на функцию открытия попапа добавления по клику кнопки Редактировать аватар
openEditAvatarPopupButton.addEventListener('click', openEditAvatarPopup);


// Обработчик формы для просмотра картинки
function hanldeOpenImageForm(data) {

  //Вызываем функцию открытия попапа Просмотр картинки
  imageViewPopup.open(data);
}

const editPopupValidator = new FormValidator(settingsObjectMesto, editPopup);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(settingsObjectMesto, addPopup);
addPopupValidator.enableValidation();

const editAvatarPopupValidator = new FormValidator(settingsObjectMesto, editAvatarPopup);
editAvatarPopupValidator.enableValidation();
