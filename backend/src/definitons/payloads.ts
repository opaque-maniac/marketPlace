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
  phone: string | undefined;
  bio: string | undefined;
  address: string | undefined;
  ownerData: RegisterUserBody;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface VerifyEmailBody {
  email: string;
}

export interface ResetPasswordBody {
  email: string;
}

export interface ConfirmResetPasswordBody {
  password: string;
}
