export interface RegisterUserBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterStaffBody extends RegisterUserBody {
  role: "ADMIN" | "MANAGER" | "STAFF";
}

export interface RegisterSellerBody extends RegisterUserBody {
  referenceNumber: string;
}

export interface OnboardingSellerBody {
  name: string;
  phone?: string;
  bio?: string;
  address?: string;
  ownerData: RegisterUserBody;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface VerifyEmailBody {
  email: string;
}

export interface ResetPasswordBody extends VerifyEmailBody {}

export interface ConfirmResetPasswordBody {
  password: string;
}

export interface ChangeEmailBody extends VerifyEmailBody {}

export interface ConfirmChangePasswordBody extends ConfirmResetPasswordBody {}

export interface OrderProductBody {
  quantity: number;
}

export interface CreateCommentBody {
  comment: string;
}

export interface ProductCreateUpdateBody {
  name: string;
  description: string;
  buyingPrice: string;
  sellingPrice: string;
  categoryId: string;
  inventory: string;
}
