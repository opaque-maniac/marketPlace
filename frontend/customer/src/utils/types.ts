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

export interface SuccessLoginRespose {
  message: string;
  token: string;
  refreshToken: string;
  customer: Customer;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  active: boolean;
  address: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string | null;
  image: CustomerImage | null;
}

export interface CustomerImage {
  id: string;
  url: string;
  createdAt: string;
}

export interface SuccessRegisterResponse {
  message: string;
  customer: Customer;
}

export interface ProductImages {
  id: string;
  url: string;
  productID: string;
  createdAt: string;
}

type Categories =
  | "ELECTRONICS"
  | "FASHION"
  | "HOME"
  | "BEAUTY"
  | "SPORTS"
  | "FOOD"
  | "BOOKS"
  | "TOYS"
  | "OTHER";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  category: Categories;
  discountPercentage: number;
  images: ProductImages[];
  createdAt: string;
  updatedAt: string | null;
  sellerID: string;
}

export interface SuccessProductsResponse {
  message: string;
  data: Product[];
  hasNext: boolean;
}

export interface SuccessProductResponse {
  message: string;
  data: Product;
}

export interface Comment {
  id: string;
  productID: string;
  customerID: string;
  customer: Customer;
  message: string;
  createdAt: string;
}

export interface SuccessCommentsResponse {
  message: string;
  data: Comment[];
  hasNext: boolean;
}

export interface SuccessNewProductResponse {
  message: string;
  product: Product;
}

export interface SuccessProductDelete {
  message: string;
}

export interface SellerImage {
  id: string;
  url: string;
  createdAt: string;
  sellerID: string;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string | null;
  image?: SellerImage;
}

export interface SuccessSellerResponse {
  message: string;
  seller: Seller;
}

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: string;
  totalAmount: number;
  status: OrderStatus;
  customerID: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  productID: string;
  product: Product;
  ready: boolean;
  delivered: boolean;
  orderID: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface OrderWithCustomer extends Order {
  customer: Customer;
}

export interface OrderItemWithOrder extends OrderItem {
  order: OrderWithCustomer;
}

export interface SuccessOrdersResponse {
  message: string;
  orders: Order[];
  hasNext: boolean;
}

export interface SuccessOrderResponse {
  message: string;
  order: OrderItemWithOrder;
}

export interface CartItem {
  id: string;
  quantity: number;
  cartID: string;
  productID: string;
  product: Product;
}

export interface Cart {
  id: string;
  customerID: string;
  dateCreated: string;
}

export interface SuccessCartResponse {
  message: string;
  cart: Cart;
  cartItems: CartItem[];
  hasNext: boolean;
}

export interface SuccessAddToCartResponse {
  message: string;
  cartItem: CartItem;
  new: boolean;
}

export interface Wishlist {
  id: string;
  customerID: string;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  productID: string;
  wishlistID: string;
  product: Product;
  createdAt: string;
}

export interface SuccessAddToWishlistResponse {
  message: string;
  wishlistItem: WishlistItem;
  new: boolean;
}

export interface SuccessSearchResponse {
  message: string;
  data: Product[];
  hasNext: boolean;
}

export interface SuccessWishlistQueryResponse {
  message: string;
  wishlist: Wishlist;
  wishlistItems: WishlistItem[];
  hasNext: boolean;
}

export interface SuccessCustomerResponse {
  message: string;
  data: Customer;
}

export interface SuccessCommentCreateResponse {
  message: string;
  data: Comment;
}

export interface SuccessRemoveFromWishlistResonse {
  message: string;
  wishlistItem: WishlistItem;
}

export interface SuccessRemoveFromCartResponse {
  message: string;
  cartItem: CartItem;
}

export interface SuccessOrderAllCartResponse {
  message: string;
  order: Order;
}

export interface SuccessCancelOrderResponse {
  message: string;
  order: Order;
}

export interface SuccessIndividualOrderResponse {
  message: string;
  order: Order;
}

export interface SuccessOrderItemResponse {
  message: string;
  orderItems: OrderItem[];
  hasNext: boolean;
}
