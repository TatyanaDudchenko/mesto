class Card {
  constructor(settingsObject, cardData, templateSelector, handleCardClick, handleCardDelete, handlePutLike, handleDeleteLike, userData) {
    this._settingsObject = settingsObject;
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
    this._likesInitialCounter(this._item);
    this._likesInitialView(this._item);
  }

  _getTemplate() {
    const cardItem = document
    .querySelector(this._templateSelector)
    .content
    .querySelector(this._settingsObject.cardSelector)
    .cloneNode(true);

    return cardItem;
  }

  _setEventListeners() {

    // Выбираем в карточке элемент Картинка
    // Cлушатель картинки для открытия попапа просмотра картинки
    this._cardImage = this._item.querySelector(this._settingsObject.cardImageSelector);
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup()
    });

    // Выбираем в карточке элемент кнопка Лайк
    // Слушатель кнопки Лайк
    this._likeButton = this._item.querySelector(this._settingsObject.likeButtonSelector);
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton(this._itemId)
    });

    // Выбираем в карточке элемент кнопка Урна
    this._trashButton = this._item.querySelector(this._settingsObject.trashButtonSelector);
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
      name: this._title,
      link: this._image
    });
  }

  toggleLike() {
    this._likeButton.classList.toggle(this._settingsObject.likeButtonActiveClass);
  }

  // Метод-обработчик кнопки Лайк
  _handleLikeButton() {

    // выбираем нужный обработчик лайка
    if (this._likeButton.classList.contains(this._settingsObject.likeButtonActiveClass)) {
      this._handleDeleteLike(this._itemId) // обработчик удаления лайка, содержащий Api запрос

    } else {
      this._handlePutLike(this._itemId) // обработчик постановки лайка, содержащий Api запрос

    }
  }

  likesCounter(updatedCardData) {
    this._arrayLikesLength = updatedCardData.likes.length;
    this._item.querySelector(this._settingsObject.likeSelector).textContent = this._arrayLikesLength;
  }


  _likesInitialCounter(updatedCardData) {
    this._arrayLikesLength = updatedCardData.likes.length;
  }

  _likesInitialView(updatedCardData) {
    this._arrayLikes = updatedCardData.likes;
  }

  _renderInitialLikes() {
    this._item.querySelector(this._settingsObject.likeSelector).textContent = this._arrayLikesLength;
  }

  // Метод-обработчик кнопки Урна
  _handleTrashButton() {
    this._item.remove(this._itemId);
  }

  deleteCard() {
    this._handleTrashButton(this._itemId); // вызываем метод удаления карточки
  }

  createCard() {

    this._item = this._getTemplate();
    this._setEventListeners();


    this._cardImage.src = this._image;
    this._item.querySelector(this._settingsObject.cardTitleSelector).textContent = this._title;
    this._cardImage.alt = this._title;

    this._renderInitialLikes();


    // проверяем совпадают ли id пользователей, если нет, то убираем кнопку Урна с карточки
    if (this._ownerId !== this._userDataId) {
      this._trashButton.remove();
      this._trashButton = null;
    }

    // окрашиваем лайки в черный цвет только на своих карточках
    const data = this._arrayLikes.find(({_id}) => _id === this._userDataId);
    if (data) {
      this._likeButton.classList.add(this._settingsObject.likeButtonActiveClass);
    } else {
      this._likeButton.classList.remove(this._settingsObject.likeButtonActiveClass);
    }

    return this._item;

  }

}

export default Card;

