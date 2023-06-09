import { BASE_URL } from "../constants";
import { getCookie, setCookie } from "./cookie";

export const apiRequest = async (url: string, options?: RequestInit) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  })
};

export const refreshToken = async () => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      "token": getCookie('refreshToken')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  await apiRequest('auth/token', options)
    .then(res => {
      setCookie('accessToken', res.accessToken);
      setCookie('refreshToken', res.refreshToken);
    })
};
