interface SellerImage {
  id: string;
  sellerId: string;
  imageUrl: string;
  dateCreated: Date;
}

interface seller {
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

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  dateCreated: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sellerId: string;
  active: boolean;
  dateCreated: Date;
  seller: seller;
  images: ProductImage[];
}

export interface ProductResponse {
  message: string;
  product: Product;
}

export interface ProductImagesProps {
  images: ProductImage[];
  name: string;
}

export interface ProductModalImagesProps {
  images: ProductImage[];
  clickedImg: string;
}
