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
  seller: Seller;
}

export interface SuccessRegisterResponse {
  message: string;
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
  products: Product[];
  hasNext: boolean;
}

export interface SuccessProductResponse {
  message: string;
  product: Product;
}

export interface Comment {
  id: string;
  productID: string;
  customerID: string;
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
