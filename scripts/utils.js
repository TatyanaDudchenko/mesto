const imagePopup = document.querySelector('.popup_type_img');

// Универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // Устанавливаем обработчик и передаем в него ссылку на функцию закрытия открытого попапа по нажатию клавиши Esc
  document.addEventListener('keydown', closeByEscape);
};

// Универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Удаляем обработчик и передаем в него ссылку на функцию закрытия открытого попапа по нажатию клавиши Esc
  document.removeEventListener('keydown', closeByEscape);
};

// Универсальная функция закрытия открытого попапа по нажатию клавиши Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    // Находим открытый попап
    const openedPopup = document.querySelector('.popup_opened');
    // Закрываем открытый попап
    closePopup(openedPopup);
  };
};

// Обработчик формы для просмотра картинки
function openImageFormHandler (data) {
  // Выбираем в попапе Просмотра картинки место для изображения и альтернативного текста
  const imagePopupImage = imagePopup.querySelector('.popup__image-is-opened');
  // Выбираем в попапе Просмотра картинки место для подписи картинки
  const imagePopupDescription = imagePopup.querySelector('.popup__description-is-opened');

  // Заполняем попап Просмотра картинки данными из начальной карточки
  imagePopupImage.src = data.link;
  imagePopupImage.alt = data.name;
  imagePopupDescription.textContent = data.name;

  //Вызываем функцию открытия попапа Просмотр картинки
  openPopup(imagePopup);
}

export {openImageFormHandler, openPopup, closePopup};
