import { LoginResponse } from "@/types/auth";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function saveAuth(data: LoginResponse) {
  // 1️⃣ Store in cookie for middleware
  document.cookie = `${TOKEN_KEY}=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

  // 2️⃣ Optional: still store in localStorage for client usage
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.email));
}

export function clearAuth() {
  // Remove cookie
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  // Remove localStorage
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
