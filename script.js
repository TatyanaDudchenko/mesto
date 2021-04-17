// Выбираем элемент попап
let editPopup = document.querySelector('.popup_type_edit');

// Выбираем кнопку открытия попапа
let openEditPopupButton = document.querySelector('.profile__button-edit');

// Выбираем кнопку закрытия попапа
let closeEditPopupButton = editPopup.querySelector('.popup__icon-close');

// Функция открытыя попапа
function openEditPopup() {
  editPopup.classList.add('popup_opened');
}

// Запускаем функцию открытия попапа по клику кнопки Редактировать
openEditPopupButton.addEventListener('click', openEditPopup);

// Функция закрытия попапа
function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}

// Запускаем функцию закрытия попапа по клику кнопки Крестик
closeEditPopupButton.addEventListener('click', closeEditPopup);

// Выбираем элемент Форма
let formPopup = editPopup.querySelector('.popup__container');

// Выбираем поле редактирования ввода Имя
let nameInput = formPopup.querySelector('.popup__input_name');

// // Выбираем поле редактирования ввода Деятельность
let jobInput = formPopup.querySelector('.popup__input_job');

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault();

    // Получаем значения полей jobInput и nameInput из свойства value
    let nameInput = document.querySelector('#inp_1');
    let jobInput = document.querySelector('#inp_2');

    // Выбираем элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__info-group_name');
    let profileJob = document.querySelector('.profile__info-group_job');

    // Вставляем новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    //Вызываем функцию закрытия попапа
    closeEditPopup()
}

formPopup.addEventListener('submit', formSubmitHandler);

// Выбираем кнопку Сохранить
let saveEditFormPopupButton = editPopup.querySelector('.popup__button-save');

//Запускаем функцию Обработчик по клику кнопки Сохранить
saveEditFormPopupButton.addEventListener('click', formSubmitHandler);
