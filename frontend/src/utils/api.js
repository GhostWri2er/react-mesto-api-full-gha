class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
  //Запросы

  //Получение данных

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkRespose);
  }

  //Получение карточек

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Редактировать профиль

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkRespose);
  }

  //Добавить карточку.

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkRespose);
  }

  //Удалить карточку

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Поставить лайк

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Удалить лайк

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Изменить аватар

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkRespose);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkRespose);
  }

  //Проверка ответа

  _checkRespose(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка check res: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.ghostwriter.nomoredomains.work',
  headers: {
    "Content-Type": "application/json",
    authorization : `Bearer ${localStorage.getItem('jwt')}`
    
  },
});

export default api;
