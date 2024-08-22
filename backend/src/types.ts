import { ORDER_STATUS } from "@prisma/client";
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

export interface TokenRefreshRequest extends Request {
  body: {
    refreshToken: string;
  };
}

export interface CustomerSearchRequest extends AuthenticatedRequest {
  body: {
    query: string;
  };
}

export interface StaffSearchRequest extends AuthenticatedRequest {
  body: {
    query: string;
  };
}

export interface StaffUpdateRequest extends AuthenticatedRequest {
  body: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface SellerSearchRequest extends AuthenticatedRequest {
  body: {
    query: string;
  };
}

export interface SellerUpdateStaffRequest extends AuthenticatedRequest {
  body: {
    email: string;
    name: string;
    address: string;
    phone: string;
  };
}

export interface UpdateOrderStatusRequest extends AuthenticatedRequest {
  body: {
    status: ORDER_STATUS;
  };
}

export interface StaffUpdateProfileRequest extends AuthenticatedRequest {
  body: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface SendComplantsRequest extends Request {
  body: {
    name: string;
    email: string;
    message: string;
  };
}
