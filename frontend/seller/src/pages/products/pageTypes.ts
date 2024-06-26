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
  discountPercent: number;
  sellerId: string;
  images: ProductImage[];
  dateCreated: Date;
}

export interface ProductData {
  message: string;
  products: Product[] | [];
  hasNextPage: boolean;
}
