export interface LoginData {
  email: string;
  password: string;
}

interface Seller {
  id: string;
  firstName: string | null;
  lastName: string | null;
  storeName: string;
  email: string;
  password: string;
  address: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  active: boolean;
  dateCreate: Date;
}

export interface LoginResponseType {
  message: string;
  seller?: Seller;
  token?: string;
}

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
    statusText?: string;
  };
  message?: string;
}
