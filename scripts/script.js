import {Card} from './Card.js';
import {openPopup, closePopup} from './helper.js';
import {FormValidator} from './FormValidator.js';

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
const gallery = document.querySelector('.gallery');

// // Выбираем в документе шаблон карточки
// const templateCard = document.querySelector('.template-card').content.querySelector('.card');

// Выбираем элементы попапы
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_img');

// Выбираем кнопки открытия попапов
const openEditPopupButton = document.querySelector('.profile__button-edit');
const openAddPopupButton = document.querySelector('.profile-container__button-add');

// Выбираем кнопки закрытия попапов
const closeEditPopupButton = editPopup.querySelector('.popup__icon-close');
const closeAddPopupButton = addPopup.querySelector('.popup__icon-close');
const closeImagePopupButton = imagePopup.querySelector('.popup__icon-close');

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
  openPopup(editPopup);
};
// Передаем в обработчик ссылку на функцию открытия попапа редактирования по клику кнопки Редактировать
openEditPopupButton.addEventListener('click', openEditPopup);

// Объявляем функцию открытия попапа добавления
function openAddPopup() {
  openPopup(addPopup);
  // Очищаем поля ввода
  titleInput.value = '';
  linkInput.value = '';
  // Находим кнопку отправки и дезактивируем ее
  const buttonSubmitAddPopup = addPopup.querySelector('.popup__button');
  buttonSubmitAddPopup.classList.add('popup__button_disabled');
  // Находим элемент сообщения об ошибке по уникальному классу
  const errorElementTitleInput = addPopup.querySelector(`.${titleInput.id}-error`);
  const errorElementLinkInput = addPopup.querySelector(`.${linkInput.id}-error`);
  // Удаляем у полей ввода класс показа ошибки ввода
  titleInput.classList.remove('popup__input_type_error');
  linkInput.classList.remove('popup__input_type_error');
  // Удаляем у элемента сообщения об ошибке активизирующий его класс
  errorElementTitleInput.classList.remove('popup__error_visible');
  errorElementLinkInput.classList.remove('popup__error_visible');
  // Очищаем текстовое значение элемента сообщения об ошибке
  errorElementTitleInput.textContent = '';
  errorElementLinkInput.textContent = '';
};
// Передаем в обработчик ссылку на функцию открытия попапа добавления по клику кнопки Добавить
openAddPopupButton.addEventListener('click', openAddPopup);

// Объявляем функцию закрытия попапа редактирования
function closeEditPopup() {
  closePopup(editPopup)
};
// Передаем в обработчик ссылку на функцию закрытия попапа редактирования по клику кнопки Крестик
closeEditPopupButton.addEventListener('click', closeEditPopup);

// Объявляем функцию закрытия попапа добавления
function closeAddPopup() {
  closePopup(addPopup)
};
// Передаем в обработчик ссылку на функцию закрытия попапа добавления по клику кнопки Крестик
closeAddPopupButton.addEventListener('click', closeAddPopup);

// Объявляем функцию закрытия попапа просмотра картинки
function closeImagePopup() {
  closePopup(imagePopup)
};
// Передаем в обработчик ссылку на функцию закрытия попапа просмотра картинки по клику кнопки Крестик
closeImagePopupButton.addEventListener('click', closeImagePopup);


// Объявляем функцию закрытия открытого попапа по клику на Оверлей
function closeByOverlay (evt) {
  // Если нажали на «оверлей», закрыть попап
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
  // Иначе ничего делать не нужно
};

// Устанавливаем обработчик на попап редактирования и передаем в него ссылку на функцию закрытия попапа по клику на Оверлей
editPopup.addEventListener('click', closeByOverlay);
// Устанавливаем обработчик на попап добавления и передаем в него ссылку на функцию закрытия попапа по клику на Оверлей
addPopup.addEventListener('click', closeByOverlay);
// Устанавливаем обработчик на попап просмотра картинки и передаем в него ссылку на функцию закрытия попапа по клику на Оверлей
imagePopup.addEventListener('click', closeByOverlay);

// Обработчик «отправки» формы для редактирования профиля
function formSubmitHandler (evt) {
  evt.preventDefault();

  // Вставляем новые значения из полей ввода на страницу с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  //Вызываем функцию закрытия попапа редактирования
  closePopup(editPopup);
}
formEditPopup.addEventListener('submit', formSubmitHandler);


// // Универсальная функция для создания карточки
// function createCard(data) {
//   // Клонируем шаблон
//   const card = templateCard.cloneNode(true);

//   // Выбираем в карточке место для вставки изображения и альтернативного текста
//   const cardImage = card.querySelector('.card__image');
//   // Выбираем в карточке место для вставки заголовка
//   const cardTitle = card.querySelector('.card__text');

//   // Вставляем данные из массива/объекта в карточки
//   cardImage.src = data.link;
//   cardImage.alt = data.name;
//   cardTitle.textContent = data.name;

//   // Обработчики на кнопки карточки

//   // Выбираем в карточке элемент кнопка Лайк
//   const likeButton = card.querySelector('.card__icon-like');
//   // Функция Лайк
//   function like() {
//     likeButton.classList.toggle('card__icon-like_active');
//   };
//   //Запускаем функцию Лайк по клику на сердечко
//   likeButton.addEventListener('click', like);


//   // Выбираем в карточке элемент кнопка Урна
//   const trashButton = card.querySelector('.card__icon-trash');
//   // Функция Удаление карточки
//   function removeCard() {
//     card.remove();
//   };
//   //Запускаем функцию Удаление карточки по клику на ведёрко
//   trashButton.addEventListener('click', removeCard);


  // // Обработчик формы для просмотра картинки
  // function openImageFormHandler (evt) {
  //   evt.preventDefault();
  //   // Выбираем в попапе Просмотра картинки место для изображения и альтернативного текста
  //   const imagePopupImage = imagePopup.querySelector('.popup__image-is-opened');
  //   // Выбираем в попапе Просмотра картинки место для подписи картинки
  //   const imagePopupDescription = imagePopup.querySelector('.popup__description-is-opened');

  //   // Заполняем попап Просмотра картинки данными из начальной карточки
  //   imagePopupImage.src = data.link;
  //   imagePopupImage.alt = data.name;
  //   imagePopupDescription.textContent = data.name;

  //   //Вызываем функцию открытия попапа Просмотр картинки
  //   openPopup(imagePopup);
  // }

//   // Запускаем функцию открытия попапа Просмотр картинки по клику на картинку
//   cardImage.addEventListener('click', openImageFormHandler);

//   return card;
// }

// Универсальная функция для отрисовки карточки
function renderCard(card) {
  gallery.prepend(card);
};

// // Запускаем функцию добавления первоначальных карточек
// initialCards.forEach(item => {
//   // Создаем переменную и запускаем функцию создания карточек из массива
//     const card = createCard(item);
//   // Запускаем функцию отрисовки карточек
//   renderCard(card);
// });

// Запускаем функцию добавления первоначальных карточек
initialCards.forEach(item => {
  const card = new Card(item, '.template-card');
  const cardItem = card.createCard();

  gallery.prepend(cardItem);
});

// Запускаем обработчик «отправки» формы для добавления новых карточек
function newCardFormSubmitHandler (evt) {
evt.preventDefault();

  // Создаем переменную с ключами со значениями соответствующих полей ввода из попапа Добавления
  const newCard = {
      name: titleInput.value,
      link: linkInput.value
    };

  // Создаем переменную и запускаем функцию создания новой карточки из попапа
  const card = new Card(newCard, '.template-card');
  const cardItem = card.createCard();

  // Запускаем функцию отрисовки карточек
  renderCard(cardItem);

  //Вызываем функцию закрытия попапа добавления
  closePopup(addPopup);
};
formAddPopup.addEventListener('submit', newCardFormSubmitHandler);


const editPopupValidator = new FormValidator(settingsObjectMesto, editPopup);
editPopupValidator.enableValidation();

const addPopupValidator = new FormValidator(settingsObjectMesto, addPopup);
addPopupValidator.enableValidation();


export {imagePopup};
