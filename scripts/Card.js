import {openImageFormHandler} from './utils.js';

const settingsObjectCard = {
  cardSelector: '.card',
  likeButtonSelector: '.card__icon-like',
  trashButtonSelector: '.card__icon-trash',
  likeButtonActiveClass: 'card__icon-like_active',
  cardImageSelector: '.card__image',
  cardTitleSelector: '.card__text'
}

class Card {
  constructor(cardData, templateSelector) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
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
      this._handleLikeButton()
    });

    // Выбираем в карточке элемент кнопка Урна
    // Слушатель кнопки Урна
    this._trashButton = this._item.querySelector(settingsObject.trashButtonSelector);
    this._trashButton.addEventListener('click', () => {
      this._handleTrashButton()
    });

  }

  // Метод-обработчик для открытия попапа просмотра картинки
  _handleOpenPopup() {
    openImageFormHandler({
      name: this._title,
      link: this._image
    });
  }

  // Метод-обработчик кнопки Лайк
  _handleLikeButton() {
    this._likeButton.classList.toggle(settingsObjectCard.likeButtonActiveClass);
  }

  // Метод-обработчик кнопки Урна
  _handleTrashButton() {
    this._item.remove();
  }

  createCard() {
    this._item = this._getTemplate(settingsObjectCard);
    this._setEventListeners(settingsObjectCard);

    this._item.querySelector(settingsObjectCard.cardImageSelector).src = this._image;
    this._item.querySelector(settingsObjectCard.cardTitleSelector).textContent = this._title;
    this._item.querySelector(settingsObjectCard.cardImageSelector).alt = this._title;

    return this._item;
  }

}

export {Card};

