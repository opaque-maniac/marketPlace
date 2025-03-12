import { useQuery } from "@tanstack/react-query";
import {
  FormEventHandler,
  lazy,
  MouseEventHandler,
  Suspense,
  useContext,
  useRef,
  useState,
} from "react";
import { fetchSellersProducts } from "../../utils/queries/sellers/fetchsellersproducts";
import Loader from "../loader";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import Pagination from "../pagination";
import SearchIcon from "../icons/searchIcon";
import ArrowPath from "../icons/arrowpath";

const ProductItem = lazy(() => import("../products/product"));

interface Props {
  id: string;
  name: string;
}

const Fallback = ({ url }: { url: string }) => {
  return (
    <Link
      to={url}
      className="h-[350px] w-[270px] flex justify-center items-center"
    >
      <div className="w-6 h-6">
        <Loader color="#000" />
      </div>
    </Link>
  );
};

export default function SellerProducts({ id, name }: Props) {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const ref = useRef<HTMLFormElement>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const { isLoading, isError, error, isSuccess, data } = useQuery({
    queryFn: fetchSellersProducts,
    queryKey: ["sellers-products", id, page, 12, query],
  });

  const products = data?.products || [];

  if (isError) {
    errorHandler(error, navigate, setErr, setError);
  }

  if (isSuccess && !data) {
    navigate("/400", { replace: true });
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const qry = formData.get("query") as string;
    setQuery(qry);
  };

  const resetHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    ref.current?.reset();
    setQuery("");
  };

  const flex =
    isLoading || !data || products.length === 0
      ? "flex justify-center items-center"
      : "";

  return (
    <>
      <div className="md:flex justify-between xl:px-0 md:px-2 px-0 mt-2 md:mb-0 mb-2">
        <div>
          <h3 className="underline text-lg font-semibold mt-4 mb-6 md:text-start text-center">
            Products:
          </h3>
        </div>
        <div className="md:w-64 w-72 md:mx-0 mx-auto">
          <form
            ref={ref}
            onSubmit={submitHandler}
            className="border border-black/20 flex items-center w-full mx-auto pr-[5px]"
          >
            <div className="w-11/12">
              <label htmlFor="search" className="sr-only">
                Search products
              </label>
              <input
                type="search"
                className="block h-10 w-full px-1 focus:outline-none focus:ring-0"
                name="query"
                placeholder="Search Products"
              />
            </div>
            <div>
              <button type="submit" className="block w-6 h-6">
                <SearchIcon />
              </button>
            </div>
            <div className="ml-2">
              <button
                aria-label="Reset query"
                onClick={resetHandler}
                className="block w-6 h-6"
              >
                <ArrowPath />
              </button>
            </div>
          </form>
        </div>
      </div>
      <section className={`min-h-[300px] md:mb-0 mb-10 ${flex}`}>
        {isLoading ? (
          <div className="w-8 h-8">
            <Loader color="#000" />
          </div>
        ) : products.length === 0 ? (
          <p>No products found for {name}</p>
        ) : (
          <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {products.map((product) => (
              <li key={product.id} className="mx-auto md:mb-8 mb-6">
                <Suspense
                  fallback={<Fallback url={`/products/${product.id}`} />}
                >
                  <ProductItem product={product} blank={true} />
                </Suspense>
              </li>
            ))}
          </ul>
        )}
      </section>
      <div className="xl:block hidden">
        <Pagination page={page} data={data} setPage={setPage} to={400} />
      </div>
      <div className="xl:hidden lg:block hidden">
        <Pagination page={page} data={data} setPage={setPage} to={720} />
      </div>
      <div className="lg:hidden md:block hidden">
        <Pagination page={page} data={data} setPage={setPage} to={740} />
      </div>
      <div className="md:hidden block">
        <Pagination page={page} data={data} setPage={setPage} to={940} />
      </div>
    </>
  );
}
