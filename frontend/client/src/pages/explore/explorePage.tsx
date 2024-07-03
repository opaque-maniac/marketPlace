import { MouseEventHandler, useContext, useState } from "react";
import PrevIcon from "../login/components/arrowLeft";
import NextIcon from "../login/components/arrowRight";
import { useQuery } from "@tanstack/react-query";
import fetchProducts from "../home/components/first/fetchProducts";
import { ResponseType } from "../home/components/first/types";
import Loader from "../../components/loader";
import { Link, useNavigate } from "react-router-dom";
import ProductItem from "../home/components/first/productItem";
import ErrorContext from "../../utils/errorContext";

interface NewResponseType extends ResponseType {
  hasNextPage: boolean;
}

const ExplorePage = () => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery(["products", { page, limit: 12 }], fetchProducts);
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);

  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (query.isError) {
    setError(true);
    navigate("/error/500", { replace: true });
  }

  const data = query.data as NewResponseType;

  const handlePrevClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleNextClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (data.hasNextPage) {
      setPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="lg:w-1200 mx-auto pt-4 h-full">
      <section className="h-full">
        <ul className="flex justify-center items-start flex-wrap lg:gap-8">
          {data.products.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <ProductItem product={product} color="white" />
              </Link>
            </li>
          ))}
        </ul>
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

export default ExplorePage;
