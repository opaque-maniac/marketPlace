interface SellerImage {
  id: string;
  sellerId: string;
  imageUrl: string;
  dateCreated: Date;
}

interface Seller {
  id: string;
  firstName?: string;
  lastName?: string;
  storeName: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  active: boolean;
  dateCreate: Date;
  image?: SellerImage;
}

export interface SellerResponse {
  message: string;
  seller: Seller;
}
