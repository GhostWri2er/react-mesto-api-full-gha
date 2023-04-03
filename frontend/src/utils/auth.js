export const baseUrl = 'https://api.mesto.ghostwriter.nomoredomains.work';

export const register = (data) => {
  console.log(data);
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "email": data.email, "password": data.password }),
  }).then((res)  =>  checkResponse(res));
  
};

export const login = (data) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "email": data.email, "password": data.password }),
  }).then((res) => checkResponse(res));
};

export const checkToken = (jwt) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization : `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка1: ${res.status}`);
}
