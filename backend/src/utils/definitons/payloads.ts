export interface RegisterUserBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface OnboardingSellerBody {
  name: string;
  phone: string | undefined;
  bio: string | undefined;
  address: string | undefined;
  ownerData: RegisterUserBody
}
