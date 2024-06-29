export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  active: boolean;
  dateCreated: string;
}

export interface RegisterResponseType {
  message: string;
  customer?: Customer;
}
