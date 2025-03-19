import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type FilterState = {
  maxprice: number;
  minprice: number;
  category: string;
};

export const initialFilters: FilterState = {
  maxprice: 0,
  minprice: 0,
  category: "",
};

export const ProductFilterContext = createContext<
  [FilterState, Dispatch<SetStateAction<FilterState>>]
>([initialFilters, () => {}]);
