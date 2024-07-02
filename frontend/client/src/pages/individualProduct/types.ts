import { Product } from "../home/components/first/types";

interface SellerImage {
  id: string;
  imageUrl: string;
  dateCreated: string;
  sellerId: string;
}

interface Seller {
  id: string;
  storeName: string;
  firstName?: string;
  lastName?: string;
  image?: SellerImage;
}

interface ProductRes extends Product {
  seller: Seller;
}

export interface ProdResponseType {
  message: string;
  product: ProductRes;
}
