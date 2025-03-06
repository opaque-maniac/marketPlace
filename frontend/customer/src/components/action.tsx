import useUserStore from "../utils/store";
import { lazy, memo, Suspense, useContext, useEffect } from "react";
import SearchForm from "./searchform";
import WishlistComponent from "./wishlist/wishlistComponent";
import CartComponent from "./cart/cartComponent";
import ProfileIcon from "./icons/profileIcon";
import { ErrorContext } from "../utils/errorContext";
import { useNavigate } from "react-router-dom";

const MemoCartComponent = memo(CartComponent);
const MemoWishlistComponent = memo(WishlistComponent);
const HeaderProfileButton = lazy(() => import("./headerprofilebutton"));

const Fallback = () => {
  return (
    <button
      aria-label="Loading"
      disabled
      className="w-full h-full bg-red-400 rounded-full p-1"
    >
      <ProfileIcon />
    </button>
  );
};

const Action = () => {
  const user = useUserStore((state) => state.user);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    const prefetch = async () => {
      try {
        await import("./headerprofilebutton");
      } catch (e) {
        console.log("Error prefetching", e);
        setError(true);
        navigate("/500", { replace: true });
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    prefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-start items-center gap-4">
      <div className="lg:w-300 w-200 md:block hidden">
        <SearchForm />
      </div>
      {user && (
        <>
          <div className="flex justify-start items-center gap-4 h-14">
            <MemoCartComponent />
            <MemoWishlistComponent />
          </div>
          <div className="md:block hidden">
            <div className="w-10 h-10 relative">
              <Suspense fallback={<Fallback />}>
                <HeaderProfileButton />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Action;
