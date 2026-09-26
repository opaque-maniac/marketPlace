export interface RegisterUserBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterStaffBody extends RegisterUserBody {
  role: "ADMIN" | "MANAGER" | "STAFF";
}

export interface RegisterSellerBody extends RegisterUserBody {}

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

export interface SellerLoginBody extends LoginBody {
  referenceNumber: string;
}

export interface VerifyEmailBody {
  email: string;
}
