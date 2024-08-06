import { Request } from "express";

export interface RegisterSellerRequest extends Request {
  body: {
    email: string;
    name: string;
    password: string;
  };
}

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    userType: string;
  };
}

export interface SellerUpdateRequest extends AuthenticatedRequest {
  body: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface ProductCreateUpdateRequest extends AuthenticatedRequest {
  body: {
    name: string;
    description: string;
    price: string;
    category: string;
    sellerID: string;
    inventory: string;
  };
}

export interface ProductSearchRequest extends AuthenticatedRequest {
  body: {
    query: string;
  };
}

export interface OrderSearchRequest extends AuthenticatedRequest {
  body: {
    query: string;
  };
}

export interface RegisterCustomerRequest extends Request {
  body: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
}

export interface CustomerUpdateRequest extends AuthenticatedRequest {
  body: {
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
  };
}

export interface CommentCreateRequest extends AuthenticatedRequest {
  body: {
    message: string;
  };
}
