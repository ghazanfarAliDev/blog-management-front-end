import { LoginResponse } from "@/types/auth";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function saveAuth(data: LoginResponse) {
  debugger;
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.email));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
