import { LoginPayload, LoginResponse, SignupPayload, SignupResponse } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function login(
  payload: LoginPayload
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}

export async function signUp(
  payload: SignupPayload
): Promise<SignupResponse>{
  const response = await fetch(`${API_BASE_URL}/auth/signup`,{
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}