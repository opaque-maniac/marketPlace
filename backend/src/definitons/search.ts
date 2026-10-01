import { Prisma } from "@prisma/client";

export type SortDirection = "asc" | "desc";

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface Pagination {
  page?: number;
  limit?: number;
}

export interface SearchResult<T> {
  items: T[];
  hasNext: boolean;
  page: number;
  limit: number;
}

export interface ProductSearchParams extends Pagination {
  query?: string;
  categoryId?: string;
  sellerId?: string;
  verified?: boolean;
  sellerVerified?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minInventory?: number;
  maxInventory?: number;
  created?: DateRange;
  updated?: DateRange;
  sortBy?:
    | "relevance"
    | "name"
    | "price"
    | "inventory"
    | "createdAt"
    | "updatedAt"
    | "rating";
  sort?: SortDirection;
}

export interface CustomerSearchParams extends Pagination {
  query?: string;
  email?: string;
  status?: "ACTIVE" | "DISABLED";
  verified?: boolean;
  active?: boolean;
  created?: DateRange;
  lastLogin?: DateRange;
  sortBy?:
    "relevance" | "name" | "email" | "createdAt" | "updatedAt" | "lastLogin";
  sort?: SortDirection;
}

export interface SellerSearchParams extends Pagination {
  query?: string;
  referenceNumber?: string;
  verified?: boolean;
  active?: boolean;
  created?: DateRange;
  updated?: DateRange;
  sortBy?: "relevance" | "name" | "createdAt" | "updatedAt";
  sort?: SortDirection;
}

export interface SellerProfileSearchParams extends Pagination {
  query?: string;
  organizationId?: string;
  role?: "OWNER" | "STAFF";
  status?: "ACTIVE" | "DISABLED";
  verified?: boolean;
  active?: boolean;
  created?: DateRange;
  lastLogin?: DateRange;
  sortBy?:
    "relevance" | "name" | "email" | "createdAt" | "updatedAt" | "lastLogin";
  sort?: SortDirection;
}

export interface StaffSearchParams extends Pagination {
  query?: string;
  email?: string;
  role?: "ADMIN" | "MANAGER" | "STAFF";
  status?: "ACTIVE" | "DISABLED";
  verified?: boolean;
  active?: boolean;
  created?: DateRange;
  lastLogin?: DateRange;
  sortBy?:
    "relevance" | "name" | "email" | "createdAt" | "updatedAt" | "lastLogin";
  sort?: SortDirection;
}

export interface OrderSearchParams extends Pagination {
  query?: string;
  customerId?: string;
  sellerId?: string;
  productId?: string;
  status?:
    "PENDING" | "PROCESSING" | "SHIPPED" | "READY" | "DELIVERED" | "CANCELLED";
  paymentStatus?: string;
  minAmount?: number;
  maxAmount?: number;
  minQuantity?: number;
  maxQuantity?: number;
  created?: DateRange;
  updated?: DateRange;
  sortBy?:
    "relevance" | "amount" | "quantity" | "status" | "createdAt" | "updatedAt";
  sort?: SortDirection;
}

export interface CartSearchParams extends Pagination {
  customerId?: string;
  created?: DateRange;
  sortBy?: "createdAt";
  sort?: SortDirection;
}

// TODO: add a query option here and do the same for the
// Search function
export interface CartItemSearchParams extends Pagination {
  cartId?: string;
  customerId?: string;
  productId?: string;
  sellerId?: string;
  minQuantity?: number;
  maxQuantity?: number;
  created?: DateRange;
  updated?: DateRange;
  sortBy?: "quantity" | "createdAt" | "updatedAt";
  sort?: SortDirection;
}

export interface WishlistSearchParams extends Pagination {
  customerId?: string;
  created?: DateRange;
  sortBy?: "createdAt";
  sort?: SortDirection;
}

// TODO: add a query option here and do the same for the
// Search function
export interface WishlistItemSearchParams extends Pagination {
  wishlistId?: string;
  customerId?: string;
  productId?: string;
  sellerId?: string;
  created?: DateRange;
  sortBy?: "createdAt" | "productName";
  sort?: SortDirection;
}

// TODO: add the disabled flag and change search function too
export interface CommentSearchParams extends Pagination {
  query?: string;
  customerId?: string;
  productId?: string;
  parentId?: string;
  topLevelOnly?: boolean;
  repliesOnly?: boolean;
  created?: DateRange;
  sortBy?: "relevance" | "createdAt";
  sort?: SortDirection;
}

export interface RatingSearchParams extends Pagination {
  productId?: string;
  customerId?: string;
  minValue?: number;
  maxValue?: number;
  created?: DateRange;
  sortBy?: "value" | "createdAt";
  sort?: SortDirection;
}

export interface CategorySearchParams extends Pagination {
  query?: string;
  sortBy?: "relevance" | "name" | "createdAt" | "updatedAt";
  sort?: SortDirection;
}

export interface ComplaintSearchParams extends Pagination {
  query?: string;
  email?: string;
  staffId?: string;
  resolved?: boolean;
  created?: DateRange;
  sortBy?: "relevance" | "createdAt";
  sort?: SortDirection;
}

export interface MisconductSearchParams extends Pagination {
  query?: string;
  personelId?: string;
  customerId?: string;
  sellerId?: string;
  staffId?: string;
  response?: "WARN_USER" | "DISABLE_PROFILE" | "DELETE_PROFILE";
  created?: DateRange;
  updated?: DateRange;
  sortBy?: "relevance" | "createdAt" | "updatedAt";
  sort?: SortDirection;
}

export interface UserActivitySearchParams extends Pagination {
  activity?:
    | "VIEW_PRODUCT"
    | "COMMENT"
    | "RATE_PRODUCT"
    | "ADD_TO_WISHLIST"
    | "ADD_TO_CART";
  productId?: string;
  customerId?: string;
  guestId?: string;
  created?: DateRange;
  sortBy?: "activity" | "createdAt";
  sort?: SortDirection;
}

export interface PaymentSearchParams extends Pagination {
  orderId?: string;
  status?: string;
  minAmount?: number;
  maxAmount?: number;
  created?: DateRange;
  sortBy?: "amount" | "status" | "createdAt";
  sort?: SortDirection;
}

export type Condition = Prisma.Sql;
