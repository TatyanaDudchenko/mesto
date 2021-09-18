// Массив для добавления карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Выбираем в документе шаблон карточки
const templateCard = document.querySelector('.template-card').content.querySelector('.card');
// Выбираем в документе галерею, которая будет заполняться карточками
const gallery = document.querySelector('.gallery');

// Запускаем функцию добавления первоначальных карточек
initialCards.forEach(item => {
// Клонируем шаблон
  const card = templateCard.cloneNode(true);

  // Выбираем в карточке место для изображения и заполняем его данными из массива
  const cardImage = card.querySelector('.card__image');
  cardImage.src = item.link;

  // Выбираем в карточке место для альтернативного текста и заполняем его данными из массива
  const cardAlt = card.querySelector('.card__image');
  cardAlt.alt = item.name;

  // Выбираем в карточке место для заголовка и заполняем его данными из массива
  const cardTitle = card.querySelector('.card__text');
  cardTitle.textContent = item.name;

  // Заполняем галерею карточками
  gallery.append(card);



  // Обработчики на кнопки карточки
  // Выбираем в карточке элемент кнопка Лайк
  const likeButton = card.querySelector('.card__icon-like');

  // Функция Лайк
  function like() {
    likeButton.classList.toggle('card__icon-like_active');
  };

  //Запускаем функцию Лайк
  likeButton.addEventListener('click', like);


  // Выбираем в карточке элемент кнопка Урна
  const trashButton = card.querySelector('.card__icon-trash');

  // Функция Удаление карточки
  function removeCard() {
    card.remove();
  };

  //Запускаем функцию Удаление карточки
  trashButton.addEventListener('click', removeCard);

});



// Выбираем элементы попапы
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');

// Выбираем кнопки открытия попапов
const openEditPopupButton = document.querySelector('.profile__button-edit');
const openAddPopupButton = document.querySelector('.profile-container__button-add');

// Выбираем кнопки закрытия попапов
const closeEditPopupButton = editPopup.querySelector('.popup__icon-close');
const closeAddPopupButton = addPopup.querySelector('.popup__icon-close');

// Функция открытия попапа редактирования
function openEditPopup() {
  editPopup.classList.add('popup_opened');
}
// Функция открытия попапа добавления
function openAddPopup() {
  addPopup.classList.add('popup_opened');
}

// Запускаем функцию открытия попапа по клику кнопки Редактировать
openEditPopupButton.addEventListener('click', openEditPopup);
// Запускаем функцию открытия попапа по клику кнопки Добавить
openAddPopupButton.addEventListener('click', openAddPopup);

// Функция закрытия попапа редактирования
function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}
// Функция закрытия попапа добавления
function closeAddPopup() {
  addPopup.classList.remove('popup_opened');
}

// Запускаем функцию закрытия попапа редактирования по клику кнопки Крестик
closeEditPopupButton.addEventListener('click', closeEditPopup);
// Запускаем функцию закрытия попапа добавления по клику кнопки Крестик
closeAddPopupButton.addEventListener('click', closeAddPopup);



// Выбираем элемент Форма редактирования
const formEditPopup = editPopup.querySelector('.popup__container');
// Выбираем поле редактирования ввода Имя
const nameInput = formEditPopup.querySelector('.popup__input_name');
// Выбираем поле редактирования ввода Деятельность
const jobInput = formEditPopup.querySelector('.popup__input_job');

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault();

    // Выбираем элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile__name');
    const profileJob = document.querySelector('.profile__job');

    // Вставляем новые значения из полей ввода на страницу с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    //Вызываем функцию закрытия попапа редактирования
    closeEditPopup();
}

formEditPopup.addEventListener('submit', formSubmitHandler);



// Выбираем элемент Форма добавления
const formAddPopup = addPopup.querySelector('.popup__container');
// Выбираем поле ввода добавления карточки Название
const titleInput = formAddPopup.querySelector('.popup__input_title');
// Выбираем поле ввода добавления карточки Ссылка
const linkInput = formAddPopup.querySelector('.popup__input_link');

// Запускаем обработчик «отправки» формы
function newCardFormSubmitHandler (evt) {
  evt.preventDefault();

    // Клонируем шаблон карточки
    const newCard = templateCard.cloneNode(true);

    // Выбираем элементы карточки, куда должны быть вставлены значения полей
    const cardImage = newCard.querySelector('.card__image');
    const cardTitle = newCard.querySelector('.card__text');

    // Вставляем новые значения из полей ввода в новую карточку
    cardImage.src = linkInput.value;
    cardTitle.textContent = titleInput.value;

    // Вставляем в галерею новую карточку
    gallery.prepend(newCard);

    //Вызываем функцию закрытия попапа добавления
    closeAddPopup();

    // Обработчики на кнопки карточки
    // Выбираем в карточке элемент кнопка Лайк
    const likeButton = newCard.querySelector('.card__icon-like');

    // Функция Лайк
    function like() {
      likeButton.classList.toggle('card__icon-like_active');
    };

    //Запускаем функцию Лайк
    likeButton.addEventListener('click', like);

    // Выбираем в карточке элемент кнопка Урна
    const trashButton = newCard.querySelector('.card__icon-trash');

    // Функция Удаление карточки
    function removeCard() {
      newCard.remove();
    };

    //Запускаем функцию Удаление карточки
    trashButton.addEventListener('click', removeCard);

    };

formAddPopup.addEventListener('submit', newCardFormSubmitHandler);


