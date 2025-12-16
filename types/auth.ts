export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
}

export interface SignupPayload{
  email: string;
  password: string;
  username: string;
}

export interface SignupResponse{
    message : string;
}