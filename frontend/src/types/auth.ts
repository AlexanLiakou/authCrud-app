export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password2?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}