export interface LoginData {
  email: string;
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
  cart: Cart;
  favorites: Favorites;
}

interface Cart {
  id: string;
  customerId: string;
  dateCreated: string;
  cartItems: CartItem[];
}

interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  dateCreated: string;
}

interface Favorites {
  id: string;
  customerId: string;
  dateCreated: string;
  favoriteItems: FavoriteItem[];
}

interface FavoriteItem {
  id: string;
  favoriteId: string;
  productId: string;
  dateCreated: string;
}

export interface LoginResponseType {
  message: string;
  customer: Customer;
  token: string;
}

export interface ErrorResponse {
  message: string;
}
