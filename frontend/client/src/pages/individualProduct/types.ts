import { Product } from "../home/components/first/types";

interface SellerImage {
  id: string;
  imageUrl: string;
  dateCreated: string;
  sellerId: string;
}

interface Seller {
  id: string;
  storeName: string;
  firstName?: string;
  lastName?: string;
  image?: SellerImage;
}

interface ProductRes extends Product {
  seller: Seller;
}

export interface ProdResponseType {
  message: string;
  product: ProductRes;
}

interface CustomerImage {
  id: string;
  imageUrl: string;
  dateCreated: string;
  customerId: string;
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
  image: CustomerImage;
}

export interface Comment {
  id: string;
  productId: string;
  customerId: string;
  customer: Customer;
  content: string;
  dateCreated: Date;
}

export interface CommentRes {
  message: string;
  comments: Comment[];
}

export interface CommentData {
  content: string;
  id: string;
}

interface CartItem {
  id: string;
  product: Product;
  cartId: string;
  productId: string;
  quantity: number;
  dateCreated: Date;
}

interface Cart {
  id: string;
  customerId: string;
  dateCreated: Date;
  cartItems: CartItem[];
}

export interface AddToCartRes {
  message: string;
  cart: Cart;
}
