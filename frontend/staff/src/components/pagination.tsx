import { MouseEventHandler } from "react";
import {
  SuccessCustomerCartResponse,
  SuccessCustomerOrdersResponse,
  SuccessCustomerWishlistResponse,
  SuccessMisconductsResponse,
  SuccessOrdersResponse,
  SuccessSellersProductsResponse,
} from "../utils/types";
import ArrowLeft from "./icons/arrowleft";
import ArrowRight from "./icons/arrowright";

type Data =
  | SuccessSellersProductsResponse
  | SuccessOrdersResponse
  | SuccessCustomerOrdersResponse
  | SuccessMisconductsResponse
  | SuccessCustomerCartResponse
  | SuccessCustomerWishlistResponse
  | undefined;

interface Props {
  page: number;
  data: Data;
  setPage: (n: number) => void;
  to: number;
}

export default function Pagination({ page, data, to, setPage }: Props) {
  const handlePrev: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      window.scrollTo(0, to);
      setPage(newPage);
    }
  };

  const handleNext: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (data && data.hasNext) {
      const newPage = page + 1;
      window.scrollTo(0, to);
      setPage(newPage);
    }
  };
  return (
    <div className="flex justify-center items-center gap-6 md:py-4 w-full h-full">
      <div>
        <button
          disabled={!data || page == 1}
          className="w-8 h-8 p-1 rounded-full border border-black"
          onClick={handlePrev}
        >
          <ArrowLeft />
        </button>
      </div>
      <div>{page}</div>
      <div>
        <button
          disabled={!data || !data.hasNext}
          className="w-8 h-8 p-1 rounded-full border border-black"
          onClick={handleNext}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
