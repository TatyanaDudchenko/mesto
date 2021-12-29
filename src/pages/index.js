import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Объявляем объект настроек валидации
const settingsObjectMesto = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Массив для добавления начальных карточек
const initialCards = [
  {
    name: 'Морская звезда',
    link: 'https://images.unsplash.com/photo-1610981263015-ef95481e9ffb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHN0YXJmaXNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Рыбы',
    link: 'https://images.unsplash.com/photo-1611833767698-7a8a336761db?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzN8fGNvcmFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Медуза',
    link: 'https://images.unsplash.com/photo-1549741501-4211de5d3757?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGplbGx5ZmlzaHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Кораллы',
    link: 'https://images.unsplash.com/photo-1589308945435-38c3f99b3824?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA2fHxjb3JhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Океан',
    link: 'https://images.unsplash.com/photo-1432889490240-84df33d47091?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fG9jZWFuJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Черепаха',
    link: 'https://images.unsplash.com/photo-1580603474920-aa3332b2c40f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHR1cnRsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];


// Выбираем в документе галерею, которая будет заполняться карточками
// const gallery = document.querySelector('.gallery');
const gallerySelector = '.gallery';

// Создаем экземпляр контейнера для карточек
const cardList = new Section({
  // передаем массив начальных карточек
    items: initialCards,
    // передаем функцию создания и отрисовки карточки
    renderer: (item) => { // создаем экземпляр карточки
      const card = new Card(item, '.template-card', openImageFormHandler);
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

const formAdd = new PopupWithForm('.popup_type_add', newCardFormSubmitHandler);
formAdd.setEventListeners();

const formEdit = new PopupWithForm('.popup_type_edit', editFormSubmitHandler);
formEdit.setEventListeners();

// Создаем объект и экземпляр класса с данными пользователя
const configUserInfo = {
  nameItemSelector: '.profile__name',
  jobItemSelector: '.profile__job'
}
const profileUserInfo = new UserInfo(configUserInfo);


// Выбираем элементы попапы
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');

// Выбираем кнопки открытия попапов
const openEditPopupButton = document.querySelector('.profile__button-edit');
const openAddPopupButton = document.querySelector('.profile-container__button-add');

// Выбираем элемент Форма редактирования
const formEditPopup = editPopup.querySelector('.popup__container');
// Выбираем поле редактирования ввода Имя
const nameInput = formEditPopup.querySelector('.popup__input_name');
// Выбираем поле редактирования ввода Деятельность
const jobInput = formEditPopup.querySelector('.popup__input_job');

// Выбираем элементы, куда должны быть вставлены значения полей (для редактирования профиля)
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Выбираем элемент Форма добавления новой карточки
const formAddPopup = addPopup.querySelector('.popup__container');
// Выбираем поле ввода добавления новой карточки Название
const titleInput = formAddPopup.querySelector('.popup__input_title');
// Выбираем поле ввода добавления новой карточки Ссылка
const linkInput = formAddPopup.querySelector('.popup__input_link');

// Объявляем функцию открытия попапа редактирования
function openEditPopup() {
  // Предарительно обновляем поля ввода
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // Предварительно очищаем ошибки валидации и деактивируем кнопку отправки формы
  editPopupValidator.resetValidation();
  // Открываем попап
  formEdit.open();
};
// Передаем в обработчик ссылку на функцию открытия попапа редактирования по клику кнопки Редактировать
openEditPopupButton.addEventListener('click', openEditPopup);

// Объявляем функцию открытия попапа добавления
function openAddPopup() {
  // Предарительно очищаем поля ввода
  titleInput.value = '';
  linkInput.value = '';
  // Предварительно очищаем ошибки валидации и деактивируем кнопку отправки формы
  addPopupValidator.resetValidation();
  // Открываем попап
  formAdd.open();
};
// Передаем в обработчик ссылку на функцию открытия попапа добавления по клику кнопки Добавить
openAddPopupButton.addEventListener('click', openAddPopup);


// Обработчик «отправки» формы для редактирования профиля
function editFormSubmitHandler (evt) {
evt.preventDefault();

  // Создаем и передаем объект с данными новых значений из полей ввода на страницу
  const profileUserData = {
    name: nameInput.value,
    job: jobInput.value
  }
  profileUserInfo.setUserInfo(profileUserData);
}

// Обработчик формы для просмотра картинки
function openImageFormHandler (data) {

  //Вызываем функцию открытия попапа Просмотр картинки
  imageViewPopup.open(data);
}

// Запускаем обработчик «отправки» формы для добавления новых карточек
function newCardFormSubmitHandler (evt) {
evt.preventDefault();

  // Создаем переменную с ключами со значениями соответствующих полей ввода из попапа Добавления
  const newCardData = {
    name: titleInput.value,
    link: linkInput.value
  };

  // создаем экземпляр новой карточки
  const newCard = new Card(newCardData, '.template-card', openImageFormHandler);
  const newCardItem = newCard.createCard(); // отрисовываем карточку
  cardList.addItem(newCardItem); // добавляем контейнер с карточкой на страницу
};

const editPopupValidator = new FormValidator(settingsObjectMesto, editPopup);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(settingsObjectMesto, addPopup);
addPopupValidator.enableValidation();
