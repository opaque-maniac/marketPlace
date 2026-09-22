export interface OnboardingSellerBody {
  name: string;
  phone: string | undefined;
  bio: string | undefined;
  address: string | undefined;
  ownerData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
}
