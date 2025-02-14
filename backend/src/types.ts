import {
  Customer,
  ORDER_STATUS,
  Seller,
  Staff,
  STAFF_ROLE,
} from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type UserRole = "customer" | "staff" | "seller";

export type UserAllTypes = Customer | Seller | Staff;

export interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  userType: UserRole;
}

export interface EmailChangeDecodedToken extends JwtPayload {
  initialEmail: string;
  newEmail: string;
  userType: UserRole;
}

export interface SecurityDecodedToken extends JwtPayload {
  emai: string;
  userType: UserRole;
}

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
  user?: DecodedToken;
}

export interface SellerUpdateRequest extends AuthenticatedRequest {
  body: {
    name: string;
    email: string;
    phone?: string;
    bio?: string;
    address?: string;
  };
}

export interface ProductCreateUpdateRequest extends AuthenticatedRequest {
  body: {
    name: string;
    description: string;
    buyingPrice: string;
    sellingPrice: string;
    category: string;
    sellerID: string;
    inventory: string;
    discount?: string;
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
    phone: string;
    message: string;
  };
}

export interface RegisterStaffRequest extends Request {
  body: {
    email: string;
    firstName: string;
    lastName: string;
    role: STAFF_ROLE;
    password: string;
  };
}

export interface StaffUpdateCommentRequest extends AuthenticatedRequest {
  body: {
    message: string;
  };
}

export interface SellerUpdateOrderRequest extends AuthenticatedRequest {
  body: {
    status: ORDER_STATUS;
  };
}

export interface VerifySecurityCodeRequest extends AuthenticatedRequest {
  body: {
    token: string;
  };
}

export interface ChangePasswordRequest extends AuthenticatedRequest {
  body: {
    password: string;
    token: string;
  };
}

export interface ResetPasswordRequest extends Request {
  body: {
    email: string;
    role: UserRole;
  };
}

export interface ChangeEmailRequest extends AuthenticatedRequest {
  body: {
    email: string;
  };
}

export interface ChangeEmailVerificationRequest extends Request {
  body: {
    token: string;
  };
}

export interface VerifyEmailRequest extends Request {
  body: {
    email: string;
    role: UserRole;
  };
}

export interface VerifyEmailTokenRequest extends Request {
  body: {
    token: string;
  };
}
