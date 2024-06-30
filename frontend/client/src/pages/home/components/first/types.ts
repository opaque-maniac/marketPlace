export interface QueryKeyType {
  page: number;
  limit: number;
}

interface ProductImage {
  id: string;
  imageUrl: string;
  productId: string;
  dateCreated: Date;
}

type ProductCategory =
  | "ELECTRONICS"
  | "BOOKS"
  | "CLOTHING"
  | "HOME_KITCHEN"
  | "BEAUTY_HEALTH"
  | "SPORTS_OUTDOORS"
  | "TOYS_GAMES";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  sales: number;
  discountPercentage: number;
  sellerId: string;
  dateCreated: Date;
  images: ProductImage[];
}

export interface ResponseType {
  message: string;
  products: Product[];
}
