// interface SellerImage {
//   id: string;
//   sellerId: string;
//   imageUrl: string;
//   dateCreated: Date;
// }

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
  dateCreate: string;
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
  category: string;
  dateCreated: string;
  sales: number;
  discountPercentage: number;
  stock: number
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
