import { BASE_URL } from "../constants";
import { getCookie, setCookie } from "./cookie";

export const apiRequest = async (url: string, options: RequestInit | undefined) => {
  const res = await fetch(`${BASE_URL}${url}`, options);
  const data = await res.json();
  if (data.success) {
    return data;
  }
  return Promise.reject(data.message);
};


export const refreshToken = async ()  => {
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
