export interface LoginPropType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  message: string;
  token: string;
  refreshToken: string;
}

export interface ErrorResonse {
  message: string;
}

export interface ErrorObj {
  status: number;
  statusText: string;
  response: ErrorResonse;
}

export interface RegisterPropType {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponseType {
  message: string;
}
