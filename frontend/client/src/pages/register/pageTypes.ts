export interface RegisterData {
  email: string;
  storeName: string;
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

export interface RegisterResponseType {
  message: string;
  seller?: Seller;
}
