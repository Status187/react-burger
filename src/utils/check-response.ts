export const checkResponse = (res: { ok: any; json: () => any; status: any; }) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}