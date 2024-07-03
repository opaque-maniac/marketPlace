import { Product } from "../home/components/first/types";

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

export interface CartResponseType {
  message: string;
  cart: Cart;
}
