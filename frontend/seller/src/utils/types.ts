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

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface SuccessLoginRespose {
  message: string;
  token: string;
  refreshToken: string;
  seller: User;
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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  discountPercentage: number;
  images: ProductImages[];
  dateCreated: string;
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
  comments: Comment[];
  hasNext: boolean;
}
