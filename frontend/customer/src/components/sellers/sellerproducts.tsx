import { MouseEventHandler, useContext, useState } from "react";
import { Seller } from "../../utils/types";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { useQuery } from "@tanstack/react-query";
import { fetchSellerProducts } from "../../utils/queries/sellers/fetchsellerproducts";
import { errorHandler } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import Loader from "../../components/loader";
import ProductList from "../../components/products/productlist";

interface Props {
  seller: Seller;
}

export default function SellerProducts({ seller }: Props) {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { isLoading, isError, error, data } = useQuery({
    queryFn: fetchSellerProducts,
    queryKey: ["products", seller.id, page, 12],
  });

  if (isError && error) {
    errorHandler(error, navigate, setErr, setError);
  }

  const leftClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPage((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const rightClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const products = data?.data || [];

  return (
    <div>
      <section className="min-h-[350px] pt-4">
        {isLoading ? (
          <div className="min-h-[350px] flex justify-center items-center">
            <div className="h-8 w-8">
              <Loader color="#fff" />
            </div>
          </div>
        ) : (
          <div>
            {products.length === 0 ? (
              <div className="min-h-[350px] flex justify-center items-center">
                <p>No products found</p>
              </div>
            ) : (
              <div>
                <ProductList
                  products={products}
                  color="black"
                  overflow={false}
                  full={true}
                />
              </div>
            )}
          </div>
        )}
      </section>
      <section className="flex justify-center items-center gap-4 py-4">
        <div>
          <button
            aria-label={page === 1 ? "No previous page" : "Previouse page"}
            disabled={page === 1}
            onClick={leftClickHandler}
            className="flex justify-center items-center w-8 h-8 border border-black/25 rounded-full px-1"
          >
            <ArrowLeft />
          </button>
        </div>
        <div>{page}</div>
        <div>
          <button
            onClick={rightClickHandler}
            aria-label={data?.hasNext ? "Next page" : "No next page"}
            disabled={isLoading || !data?.hasNext}
            className="flex justify-center items-center w-8 h-8 border border-black/25 rounded-full px-1"
          >
            <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}
