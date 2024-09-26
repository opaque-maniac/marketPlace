import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { cartPageStore } from "../../utils/pageStore";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import { fetchWishlist } from "../../utils/queries/wishlist";
import EmptyWishlist from "../../components/emptywishlist";
import Wishlist from "../../components/wishlistlist";

const WishlistPage = () => {
  const page = cartPageStore((state) => state.page);
  const setPage = cartPageStore((state) => state.setPage);
  const [, setError] = useContext(ErrorContext);

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);

  useEffect(() => {
    navigate(`/wishlist?page=${page}`, { replace: true });

    return () => {
      setPage(1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, navigate]);

  const query = useQuery({
    queryKey: ["wishlist", page, 10],
    queryFn: fetchWishlist,
  });

  if (query.isError) {
    const data = query.error;
    try {
      const error = JSON.parse(data.message) as ErrorResponse;
      const [show, url] = errorHandler(error.errorCode);
      if (show) {
        setErr(error.message);
      } else {
        if (url) {
          if (url === "/500") {
            setError(true);
          }
          navigate(url);
        } else {
          setErr("An unexpected error occurred.");
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      // navigate(`?page=${newPage}`);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      setPage(newPage);
      // navigate(`?page=${newPage}`);
    }
  };

  const data = query.data;
  const wishlistItems = data?.wishlistItems || [];
  const refetchWishlist = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query.refetch();
  }, [query]);

  useEffect(() => {
    refetchWishlist();
  }, [refetchWishlist]);

  return (
    <Transition>
      <Helmet>
        <title>Wishlist</title>
        <meta
          name="description"
          content="Wishlist page for Hazina marketplace app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <div className="flex justify-end items-center pr-4 py-4">
          <EmptyWishlist
            refetch={refetchWishlist}
            disable={wishlistItems.length === 0}
          />
        </div>
        <section
          className="px-2 py-2"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          {query.isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <div className="h-20 w-20">
                <Loader color="#fff" />
              </div>
            </div>
          ) : (
            <div className="h-full w-full">
              <Wishlist
                wishlistItems={wishlistItems}
                color="black"
                overflow={false}
                full={true}
                refetch={refetchWishlist}
              />
            </div>
          )}
        </section>
        <section className="flex justify-center items-center gap-6 py-2">
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
              disabled={!data || query.data?.hasNext === false}
              className="w-8 h-8 p-1 rounded-full border border-black"
              onClick={handleNext}
            >
              <ArrowRight />
            </button>
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default WishlistPage;
