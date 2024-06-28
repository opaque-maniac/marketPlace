import { useQuery } from "@tanstack/react-query";
import { MouseEventHandler, useState } from "react";
import fetchProducts from "./fetchProducts";
import Loader from "../../../components/loader";
import { ProductData } from "../pageTypes";
import NoProducts from "../../login/components/noPoducts";
import PrevIcon from "../../login/components/arrowLeft";
import NextIcon from "../../login/components/arrowRight";
import ProductItem from "./productsItem";

const ProductsList = () => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery(["products", page], fetchProducts);

  const handleNextClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const data = query.data as ProductData;

  return (
    <div>
      <section
        className="md:pt-8 pt-4"
        style={{ minHeight: "calc(100vh - 10rem)" }}
      >
        {data.products && data.products.length > 0 ? (
          <ul className="md:flex flex-wrap justify-center items-center lg:gap-14 md:gap-8">
            {data.products.map((product) => (
              <li key={product.id} className="md:mb-0 mb-8">
                <ProductItem product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <NoProducts />
          </>
        )}
      </section>
      <div
        id="pagination"
        className="flex justify-center items-center gap-8 mt-8 mb-4"
      >
        <div>
          <button
            onClick={handlePrevClick}
            disabled={page === 1 ? true : false}
            className="cursor-pointer hover:transform hover:scale-110"
          >
            <PrevIcon />
          </button>
        </div>
        <div>
          <span>{page}</span>
        </div>
        <div>
          <button
            onClick={handleNextClick}
            disabled={data.hasNextPage ? false : true}
            className="cursor-pointer hover:transform hover:scale-110"
          >
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
