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
