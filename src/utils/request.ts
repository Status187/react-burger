import { checkResponse } from "./check-response";
import { BASE_URL } from '../constants';

export async function request(url: string, option: RequestInit | undefined) {
  const res = await fetch(BASE_URL + url, option);
  return checkResponse(res);
}