import { Product } from "../products/pageTypes";

export interface DeleteResponse {
  message: string;
  product?: Product;
}
