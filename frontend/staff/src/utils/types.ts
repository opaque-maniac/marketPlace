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

export interface Complaint {
  id: string;
  phone: string | undefined;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  resolved: boolean;
  staffID?: string;
  staff?: Staff;
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
  image?: CustomerImage;
}

export interface CustomerImage {
  id: string;
  url: string;
  createdAt: string;
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
  buyingPrice: number;
  sellingPrice: number;
  inventory: number;
  category: Categories;
  discountPercentage: number;
  images: ProductImages[];
  createdAt: string;
  updatedAt: string | null;
  sellerID: string;
}

export interface Comment {
  id: string;
  productID: string;
  customerID: string;
  customer: Customer;
  message: string;
  createdAt: string;
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
  quantity: number;
  product: Product;
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
  updatedAt: string;
}

export type ROLE = "STAFF" | "ADMIN" | "MANAGER";

export interface Staff {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  active: boolean;
  role: ROLE;
  image?: StaffImage;
  complaints: Complaint[];
  createdAt: string;
  updatedAt: string;
}

export interface StaffImage {
  id: string;
  url: string;
  createdAt: string;
  staffID: string;
}

export interface Complaint {
  id: string;
  email: string;
  name: string;
  message: string;
  phone: string;
  createdAt: string;
  resolved: boolean;
  staffID?: string;
  staff?: Staff;
}

export interface SuccessComplaintResponse {
  message: string;
}

export interface SuccessLoginRespose {
  message: string;
  token: string;
  refreshToken: string;
  staff: Staff;
}

export interface SuccessRegisterResponse {
  message: string;
  staff: Staff;
}

export interface SuccessProductsResonse {
  message: string;
  products: Product[];
  hasNext: boolean;
}

export interface SuccessProductsSearchResponse {
  message: string;
  products: Product[];
  hasNext: boolean;
}

export interface SuccessProductResponse {
  message: string;
  product: Product;
}

export interface SuccessProductCommentsResponse {
  message: string;
  comments: Comment[];
  hasNext: boolean;
}

export interface SuccessCustomersResponse {
  message: string;
  customers: Customer[];
  hasNext: boolean;
}

export interface SuccesCustomersSearchResponse {
  message: string;
  customers: Customer[];
  hasNext: boolean;
}

export interface SuccessUpdateProductRespnse {
  message: string;
  product: Product;
}

export interface SuccessStaffResponse {
  message: string;
  staff: Staff[];
  hasNext: boolean;
}

export interface SuccessCartsResponse {
  message: string;
  carts: Cart[];
  hasNext: boolean;
}

export interface SuccessIndividualOrderResponse {
  message: string;
  order: Order;
}

export interface SuccessOrdersResponse {
  message: string;
  orders: Order[];
  hasNext: boolean;
}

export interface SuccessOrderItemResponse {
  message: string;
  items: OrderItem[];
  hasNext: boolean;
}

export interface SuccessStaffProfileResponse {
  message: string;
  data: Staff;
}

export interface SuccessWishlistQueryResponse {
  message: string;
}

export interface SuccessCustomerResponse {
  message: string;
  customer: Customer;
}

export interface SuccessSellersListResponse {
  message: string;
  sellers: Seller[];
  hasNext: boolean;
}

export interface SuccessCustomerCartResponse {
  message: string;
  cartItems: CartItem[];
  hasNext: boolean;
}

export interface SuccessCustomerOrdersResponse {
  message: string;
  orders: Order[];
  hasNext: boolean;
}

export interface SuccessCustomerWishlistResponse {
  message: string;
  wishlistItems: WishlistItem[];
  hasNext: boolean;
}

export interface SuccessComplaintsResponse {
  messaeg: string;
  complaints: Complaint[];
  hasNext: boolean;
}
