import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense, useContext, useState } from "react";
import { fetchSellersProducts } from "../../utils/queries/sellers/fetchsellersproducts";
import Loader from "../loader";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import Pagination from "../pagination";

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

  const flex =
    isLoading || !data || products.length === 0
      ? "flex justify-center items-center"
      : "";

  return (
    <section
      className={`xl:min-h-[235px] lg:min-h-[600px] md:min-h-[300px] min-h-[300px] md:mb-0 mb-10 ${flex}`}
    >
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
              <Suspense fallback={<Fallback url={`/products/${product.id}`} />}>
                <ProductItem product={product} blank={true} />
              </Suspense>
            </li>
          ))}
        </ul>
      )}
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
    </section>
  );
}
