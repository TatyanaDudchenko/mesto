class Api {
  constructor({baseUrl, token}) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  _handleResult() {

  }

  // метод для загрузки информации о пользователе с сервера
  getUserData() {
  return fetch(`${this.baseUrl}/users/me`, {
    headers: {
      authorization: `${this.token}`,
    }
  })
    .then(result => {
      if (result.ok) {
        return result.json();
      }

      return Promise.reject(`Ошибка при загрузке информации о пользователе: ${result.status}`);
    })

  }

  // метод для загрузки начальных карточек с сервера
  getInitialCards() {
  return fetch(`${this.baseUrl}/cards`, {
    headers: {
      authorization: `${this.token}`,
    }
  })
    .then(result => {
      if (result.ok) {
        return result.json();
      }

      return Promise.reject(`Ошибка при загрузке начальных карточек: ${result.status}`);
    })

  }

  // метод для редактирования профиля
  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(result => {
      if (result.ok) {
        return result.json();
      }

      return Promise.reject(`Ошибка при редактировании профиля: ${result.status}`);
    })

  }

  // метод для добавления новой карточки
  createNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link,
      userData: data._id
    })
  })
    .then(result => {
      if (result.ok) {
        return result.json();
      }

      return Promise.reject(`Ошибка при добавлении новой карточки: ${result.status}`);
    })

  }

  // метод для удаления карточки
  deleteCard(item) {
    return fetch(`${this.baseUrl}/cards/${item._id}`, {
    method: 'DELETE',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: item._id,
    })
  })
    .then(result => {
      if (result.ok) {
        return result.json;
      }

      return Promise.reject(`Ошибка при удалении карточки: ${result.status}`);
    })

  }


}

export default Api

