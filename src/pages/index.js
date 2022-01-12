import Api from '../components/Api.js';
import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithСonfirm from '../components/PopupWithСonfirm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, settingsObjectMesto, gallerySelector, сonfirmPopup, editPopup, addPopup, openEditPopupButton, openAddPopupButton, nameInput, jobInput, profileName, profileJob, titleInput, linkInput } from '../utils/constants';
import Popup from '../components/Popup.js';

// _id: '15e91967d697fa5faaec02f2'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  token: '00d03ff0-290d-430c-82a1-6d959f58942a',
  // _id: cardElement._id
});

// api.getInitialCards()
//   .then((result) => { // items
//     cardList.renderItem(result); // items
//     })

//   .catch((err) => {
//     console.log('ОШИБКА:', err);
//   });

// api.getUserData()
//   .then((result) => { // data
//     profileUserInfo.setUserInfo(result); // data
//     })

//   .catch((err) => {
//     console.log('ОШИБКА:', err);
//   });

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, items]) => {
    profileUserInfo.setUserInfo(userData)
    // console.log('данные с сервера', userData)
    cardList.renderItem(items);
  })

// Создаем экземпляр попапа с формой подтверждения
const сonfirmForm = new PopupWithСonfirm(
  '.popup_type_confirm',
  function deleteCard(cardElement) { //(()=>{})
    api.deleteCard(cardElement)
    .then(result => cardElement.deleteCard(result))
  }
  )
сonfirmForm.setEventListeners();

// Функция создания карточки
const createCard = (item) => {
  const cardElement = new Card(
    item,
    '.template-card',
    hanldeOpenImageForm,
    handleOpenConfirmForm,
    function handleCardDelete(card) {
      сonfirmForm.setSubmitHandler(function deleteCard() { //(()=>{})
        api.deleteCard(card)
        .then(result => cardElement.deleteCard(result))
      });
    }
    );
  return cardElement.createCard(); // отрисовываем карточку
}

// // Функция создания карточки
// const createCard = (item) => {
//   const cardElement = new Card(
//     item,
//     '.template-card',
//     hanldeOpenImageForm,
//     handleOpenConfirmForm,
//     function handleCardDelete(card) {
//       сonfirmForm.setSubmitHandler(function deleteCard() { //(()=>{})
//         api.deleteCard(card)
//         .then(result => cardElement.deleteCard(result))
//       });
//     }
//     );
//   return cardElement.createCard(); // отрисовываем карточку
// }


// Создаем экземпляр контейнера для карточек
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, gallerySelector)


// Создаем экземпляр попапа с формой добавления
const formAdd = new PopupWithForm(
  '.popup_type_add',

    function hanldeNewCardFormSubmit(data) {
      console.log('данные формы добавления:', data)
      // api.createNewCard({
      //   data,
      //   user: profileUserInfo.getUserInfo()
      // })
      api.createNewCard(data)
      .then(result => cardList.addItem(createCard(result)))
      // .then(result => console.log((result)))
      // console.log(data)
    }

)
formAdd.setEventListeners();



// Создаем экземпляр попапа с формой редактирования
const formEdit = new PopupWithForm(
  '.popup_type_edit',

    function hanldeEditFormSubmit(userData) {
      api.editProfile(userData)
      .then(result => profileUserInfo.setUserInfo(result))
    }

)
formEdit.setEventListeners();




// Создаем экземпляр попапа просмотра картинки
const imageViewPopup = new PopupWithImage('.popup_type_img');
imageViewPopup.setEventListeners();






// Создаем объект и экземпляр класса с данными пользователя
const configUserInfo = {
  nameItemSelector: '.profile__name',
  jobItemSelector: '.profile__job'
}
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


// // Обработчик «отправки» формы для редактирования профиля
// function hanldeEditFormSubmit(data) {

//   profileUserInfo.setUserInfo(data);
// }

// Обработчик формы для просмотра картинки
function hanldeOpenImageForm(data) {

  //Вызываем функцию открытия попапа Просмотр картинки
  imageViewPopup.open(data);
}

// Обработчик открытия попапа подтверждения
function handleOpenConfirmForm() {

  //Вызываем функцию открытия формы подтверждения
  сonfirmForm.open();
}

// // Запускаем обработчик «отправки» формы для добавления новых карточек
// function hanldeNewCardFormSubmit(data) {

//   const newCardItem = createCard(data); // вызываем функцию создания карточки и сохраняем результат в переменную
//   cardList.addItem(newCardItem); // добавляем контейнер с карточкой на страницу
// };

const editPopupValidator = new FormValidator(settingsObjectMesto, editPopup);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(settingsObjectMesto, addPopup);
addPopupValidator.enableValidation();
