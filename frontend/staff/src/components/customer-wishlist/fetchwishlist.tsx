import { Suspense, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import ArrowLeft from "../icons/arrowleft";
import { useQuery } from "@tanstack/react-query";
import ArrowRight from "../icons/arrowright";
import Loader from "../loader";
import { errorHandler } from "../../utils/errorHandler";
import { fetchCustomerWishlist } from "../../utils/queries/customers/fetchcustomerwishlist";
import WishlistItemComponent from "./wishlistitem";

interface Props {
  id: string;
  page: number;
  query: string;
}

const Fallback = () => {
  return (
    <div className="w-[270px] h-[350px] flex justify-center items-center">
      <div className="h-10 w-10">
        <Loader color="#fff" />
      </div>
    </div>
  );
};

export default function FetchWishlist({ id, page, query }: Props) {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { isLoading, isError, isSuccess, error, data, refetch } = useQuery({
    queryFn: fetchCustomerWishlist,
    queryKey: ["customer-orders", id, page, 12, query],
  });

  if (isError && error) {
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

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      const newPage = page - 1;
      navigate(`?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (data?.hasNext) {
      const newPage = page + 1;
      navigate(`?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

  const wishlistItems = data?.wishlistItems || [];

  return (
    <div>
      <section
        style={{ minHeight: "calc(100vh - 7rem)" }}
        className={
          wishlistItems.length === 0 || !isLoading
            ? "flex justify-center items-center"
            : ""
        }
      >
        {isLoading ? (
          <div className="w-8 h-8">
            <Loader color="#000" />
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="w-10/12">
            <p className="font-semibold text-lg">This wishlist is empty.</p>
          </div>
        ) : (
          <ul className="grid lg:grid-cols-2 grid-cols-1">
            {wishlistItems.map((item) => (
              <li key={item.id} className="mx-auto md:mb-8 mb-6">
                <Suspense fallback={<Fallback />}>
                  <WishlistItemComponent
                    item={item}
                    refetch={refetchCallback}
                  />
                </Suspense>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="flex justify-center items-center gap-6 py-4">
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
            disabled={!data || !data?.hasNext}
            className="w-8 h-8 p-1 rounded-full border border-black"
            onClick={handleNext}
          >
            <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}
