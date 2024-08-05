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
  };
}
