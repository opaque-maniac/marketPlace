import { useQuery } from "@tanstack/react-query";
import Transition from "../../components/transition";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";
import { Helmet } from "react-helmet";
import { fetchWishlist } from "../../utils/queries/wishlist";
import EmptyWishlist from "../../components/wishlist/emptywishlist";
import Wishlist from "../../components/wishlist/wishlistlist";
import { errorHandler } from "../../utils/errorHandler";
import MetaTags from "../../components/metacomponent";

const WishlistPage = () => {
  const [, setError] = useContext(ErrorContext);

  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const _page = new URLSearchParams(window.location.search).get("page");

  useEffect(() => {
    if (!_page) {
      navigate("?page=1", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = Number(_page) || 1;

  const query = useQuery({
    queryKey: ["wishlist", page, 10],
    queryFn: fetchWishlist,
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      navigate(`?page=${newPage}`);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query.data?.hasNext) {
      const newPage = page + 1;
      navigate(`?page=${newPage}`);
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
      <MetaTags
        title="Wishlist | Hazina"
        description="Your wishlist page"
        keywords={[
          "wishlist",
          "wishlist page",
          "my wishlist",
          "saved items",
          "items to buy",
        ]}
        image="/images/logo.svg"
        allowBots={false}
      />
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
