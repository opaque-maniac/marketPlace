import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import { Link, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense, useCallback, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { Helmet } from "react-helmet";
import { errorHandler } from "../../utils/errorHandler";
import ManageQueryStr from "../../utils/querystr";
import { fetchCustomerWishlist } from "../../utils/queries/customers/fetchcustomerwishlist";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import PageSearchForm from "../../components/pagesearchform";

const WishlistItemComponent = lazy(
  () => import("../../components/customer-wishlist/wishlistitem"),
);

const Fallback = ({ url }: { url: string }) => {
  return (
    <Link
      to={url}
      className="h-[375px] w-[260px] border flex justify-center items-center"
    >
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </Link>
  );
};

export default function CustomerWishlistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const params = new URLSearchParams(window.location.search);
  const _page = params.get("page");
  const _query = params.get("query");

  useEffect(() => {
    if (!id) {
      navigate("/404", { replace: true });
      return;
    }

    ManageQueryStr(navigate, _page, _query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;
  const query = _query || "";

  const { isLoading, isError, isSuccess, data, error, refetch } = useQuery({
    queryFn: fetchCustomerWishlist,
    queryKey: ["customer-wishlist", id || "", page, 12, query],
  });

  if (isError) {
    errorHandler(error, navigate, setErr, setError);
  }

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  const refetchCallback = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = data?.wishlistItems || [];

  return (
    <Transition>
      <Helmet>
        <title>Customers</title>
        <meta
          name="description"
          content="Customers page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full md:pt-16 pt-12 relative pb-4">
        <p className="absolute top-4 left-4">
          <Link
            to={`/customers/${id}`}
            className="xl:no-underline xl:hover:underline underline"
          >
            Customer
          </Link>{" "}
          / <span className="font-extrabold">Wishlist</span>
        </p>
        <div className="md:absolute right-4 top-2 md:mx-0 mx-auto md:w-60 w-72 md:mb-0 mb-4">
          <PageSearchForm placeholder="Search wishist" />
        </div>
        {isLoading ? (
          <section className="page-loader-height flex justify-center items-center">
            <div className="w-10 h-10">
              <Loader color="#000" />
            </div>
          </section>
        ) : (
          <div
            className={`page-loader-height ${
              items.length === 0 ? "flex justify-center items-center" : ""
            }`}
          >
            {items.length === 0 ? (
              <p>No wishlist items found</p>
            ) : (
              <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                {items.map((item) => (
                  <li key={item.id} className="mx-auto md:mb-8 mb-6">
                    <Suspense
                      fallback={
                        <Fallback url={`/products/${item.productID}`} />
                      }
                    >
                      <WishlistItemComponent
                        item={item}
                        refetch={refetchCallback}
                      />
                    </Suspense>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <section>
          <div className="md:block hidden">
            <Pagination
              page={page}
              data={data}
              setPage={(n) => {
                navigate(`?page=${n}&query=${query}`);
              }}
              to={50}
            />
          </div>
          <div className="md:hidden block">
            <Pagination
              page={page}
              data={data}
              setPage={(n) => {
                navigate(`?page=${n}&query=${query}`);
              }}
              to={90}
            />
          </div>
        </section>
      </main>
    </Transition>
  );
}
