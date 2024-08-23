export interface CompaintData {
  email: string;
  name: string;
  phone?: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  errorCode: string;
}

export interface SuccessComplaintResponse {
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface SuccessLoginRespose {
  message: string;
  token: string;
  refreshToken: string;
  user: User;
}

export interface SuccessRegisterResponse {
  message: string;
}
