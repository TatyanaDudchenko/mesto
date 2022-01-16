import Api from "./Api";

const settingsObjectCard = {
  cardSelector: '.card',
  likeButtonSelector: '.card__icon-like',
  trashButtonSelector: '.card__icon-trash',
  likeButtonActiveClass: 'card__icon-like_active',
  cardImageSelector: '.card__image',
  cardTitleSelector: '.card__text',
  likeSelector: '.card__counter-like'
}

class Card {
  constructor(cardData, templateSelector, handleCardClick, handleCardDelete, handlePutLike, handleDeleteLike, userData) {
    this._item = cardData;
    this._title = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
    this._userDataId = userData._id; // id текущего пользователя
    this._ownerId = cardData.owner._id; // id владельца карточки
    this._itemId = cardData._id // id карточки

  }

  _getTemplate(settingsObject) {
    const cardItem = document
    .querySelector(this._templateSelector)
    .content
    .querySelector(settingsObject.cardSelector)
    .cloneNode(true);

    return cardItem;
  }

  _setEventListeners(settingsObject) {

    // Выбираем в карточке элемент Картинка
    // Cлушатель картинки для открытия попапа просмотра картинки
    this._cardImage = this._item.querySelector(settingsObject.cardImageSelector);
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup()
    });

    // Выбираем в карточке элемент кнопка Лайк
    // Слушатель кнопки Лайк
    this._likeButton = this._item.querySelector(settingsObject.likeButtonSelector);
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton(this._itemId)
    });

    // Выбираем в карточке элемент кнопка Урна
    this._trashButton = this._item.querySelector(settingsObject.trashButtonSelector);
    // проверяем, есть ли на карточке элемент иконки удаления
    if (this._trashButton) {
      // Слушатель кнопки Урна
      this._trashButton.addEventListener('click', () => {
        this._handleCardDelete(this._itemId) //вызвали обработчик, открывющий форму подтверждения и удаляющий карточку при сабмите формы
      });
    }

  }

  // Метод-обработчик для открытия попапа просмотра картинки
  _handleOpenPopup() {
    this._handleCardClick({
      name: this._title, // проверить не дублирование кода ли это (см. в index.js function hanldeOpenImageForm(data) эти же данные скорей всего передаются по data)
      link: this._image
    });
  }

  _toggleLike() {
    this._likeButton.classList.toggle(settingsObjectCard.likeButtonActiveClass);
  }

  // Метод-обработчик кнопки Лайк
  _handleLikeButton() {

    // выбираем нужный обработчик лайка
    if (this._likeButton.classList.contains(settingsObjectCard.likeButtonActiveClass)) {
      this._handleDeleteLike(this._itemId) // обработчик удаления лайка, содержащий Api запрос
      this._toggleLike();
    } else {
      this._handlePutLike(this._itemId) // обработчик постановки лайка, содержащий Api запрос
      this._toggleLike();
    }
  }

  likesCounter(arrayLikesLength) {
    this._counter = arrayLikesLength;

    this._renderLikes(this._counter);
  }

  renderLikes() {
    this._likes = document.querySelector(settingsObjectCard.likeSelector);
    this._likes.textContent = this._counter;
  }

  // Метод-обработчик кнопки Урна
  _handleTrashButton() {
    this._item.remove(this._itemId);
  }

  deleteCard() {
    this._handleTrashButton(this._itemId); // вызываем метод удаления карточки
  }

  createCard() {

    this._item = this._getTemplate(settingsObjectCard);
    this._setEventListeners(settingsObjectCard);

    // this._link = data.link;
    // this._name = data.name

    this._cardImage.src = this._image;
    this._item.querySelector(settingsObjectCard.cardTitleSelector).textContent = this._title;
    this._cardImage.alt = this._title;


    // проверяем совпадают ли id пользователей, если нет, то убираем кнопку Урна с карточки
    if (this._ownerId !== this._userDataId) {
      this._trashButton.remove();
      this._trashButton = null;
    }

    return this._item;


  }

}

export default Card;

// const settingsObjectCard = {
//   cardSelector: '.card',
//   likeButtonSelector: '.card__icon-like',
//   trashButtonSelector: '.card__icon-trash',
//   likeButtonActiveClass: 'card__icon-like_active',
//   cardImageSelector: '.card__image',
//   cardTitleSelector: '.card__text'
// }

// class Card {
//   constructor(cardData, templateSelector, handleCardClick) {
//     this._title = cardData.name;
//     this._image = cardData.link;
//     this._templateSelector = templateSelector;
//     this._handleCardClick = handleCardClick;
//   }

//   _getTemplate(settingsObject) {
//     const cardItem = document
//     .querySelector(this._templateSelector)
//     .content
//     .querySelector(settingsObject.cardSelector)
//     .cloneNode(true);

//     return cardItem;
//   }

//   _setEventListeners(settingsObject) {

//     // Выбираем в карточке элемент Картинка
//     // Cлушатель картинки для открытия попапа просмотра картинки
//     this._cardImage = this._item.querySelector(settingsObject.cardImageSelector);
//     this._cardImage.addEventListener('click', () => {
//       this._handleOpenPopup()
//     });

//     // Выбираем в карточке элемент кнопка Лайк
//     // Слушатель кнопки Лайк
//     this._likeButton = this._item.querySelector(settingsObject.likeButtonSelector);
//     this._likeButton.addEventListener('click', () => {
//       this._handleLikeButton()
//     });

//     // Выбираем в карточке элемент кнопка Урна
//     // Слушатель кнопки Урна
//     this._trashButton = this._item.querySelector(settingsObject.trashButtonSelector);
//     this._trashButton.addEventListener('click', () => {
//       this._handleTrashButton()
//     });

//   }

//   // Метод-обработчик для открытия попапа просмотра картинки
//   _handleOpenPopup() {
//     this._handleCardClick({
//       name: this._title,
//       link: this._image
//     });
//   }

//   // Метод-обработчик кнопки Лайк
//   _handleLikeButton() {
//     this._likeButton.classList.toggle(settingsObjectCard.likeButtonActiveClass);
//   }

//   // Метод-обработчик кнопки Урна
//   _handleTrashButton() {
//     this._item.remove();
//   }

//   createCard() {
//     this._item = this._getTemplate(settingsObjectCard);
//     this._setEventListeners(settingsObjectCard);

//     this._cardImage.src = this._image;
//     this._item.querySelector(settingsObjectCard.cardTitleSelector).textContent = this._title;
//     this._cardImage.alt = this._title;

//     return this._item;
//   }

// }

// export default Card;
