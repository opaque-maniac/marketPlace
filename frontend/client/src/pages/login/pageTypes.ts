export interface LoginData {
  email: string;
  password: string;
}

interface ProductImage {
  id: string;
  imageUrl: string;
  productId: string;
  dateCreated: Date;
}

type ProductCategory =
  | "ELECTRONICS"
  | "BOOKS"
  | "CLOTHING"
  | "HOME_KITCHEN"
  | "BEAUTY_HEALTH"
  | "SPORTS_OUTDOORS"
  | "TOYS_GAMES";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  sales: number;
  discountPercent: number;
  sellerId: string;
  dateCreated: Date;
  images: ProductImage[];
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
