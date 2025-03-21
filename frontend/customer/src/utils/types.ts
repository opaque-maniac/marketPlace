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

export type Categories =
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
  buyingPrice: number;
  sellingPrice: number;
  inventory: number;
  category: Categories;
  images: ProductImages[];
  createdAt: string;
  updatedAt: string | null;
  sellerID: string;
  seller: Seller;
}

export interface SuccessProductsResponse {
  message: string;
  data: Product[];
  sellers: Seller[];
  hasNext: boolean;
}

export interface SuccessProductResponse {
  message: string;
  data: Product;
  value: number;
  count: number;
}

export interface Comment {
  id: string;
  productID: string;
  customerID: string;
  customer: Customer;
  hasReplies: boolean;
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
  bio?: string;
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
  quantity: number;
  status: OrderStatus;
  customerID: string;
  customer: Customer;
  productID: string;
  product: Product;
  sellerID: string;
  seller: Seller;
  createdAt: string;
  updatedAt: string;
}

export interface OrderWithCustomer extends Order {
  customer: Customer;
}

export interface SuccessOrdersResponse {
  message: string;
  orders: Order[];
  hasNext: boolean;
}

export interface SuccessOrderResponse {
  message: string;
  order: Order;
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

export interface SuccessFetchSellerResponse {
  message: string;
  seller: Seller;
}

export interface SuccessEmailResponse {
  message: string;
  email: string;
}

export interface SuccessTokenResponse {
  message: string;
}

export interface SuccessRepliesResponse {
  message: string;
  replies: Comment[];
  hasNext: boolean;
}

export interface SuccessIndividualCommentResponse {
  message: string;
  comment: Comment;
}

export interface SuccessProfileUpdate {
  message: string;
  image: CustomerImage | null;
}

export interface SuccessProductRatings {
  message: string;
  rating: {
    value: number;
  } | null;
}
