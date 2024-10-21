import { Link, useNavigate } from "react-router-dom";
import HeartIcon from "../icons/heart";
import useFetchWishlist from "../../utils/hooks/wishlist";
import { useContext, useEffect } from "react";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";

const WishlistComponent = () => {
  const { wishlist, e } = useFetchWishlist();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (e) {
      if (e instanceof Error) {
        try {
          const error = JSON.parse(e.message) as ErrorResponse;
          const [show, url] = errorHandler(error.errorCode);
          if (show) {
            setErr(error.message);
          } else {
            if (url) {
              if (url === "/500") {
                setError(true);
              }
              navigate(url);
            }
          }
        } catch (e) {
          if (e instanceof Error) {
            setErr("An unexpected error occurred.");
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [e]);

  return (
    <div>
      <Link
        to={"/wishlist"}
        aria-label="Go to wishlist page"
        className="block w-6 h-6 rounded-full relative"
      >
        <div className="absolute bg-red-400 h-4 w-4 -top-1  rounded-full -right-2 flex justify-center items-center">
          <span className="text-white">{wishlist}</span>
        </div>
        <HeartIcon />
      </Link>
    </div>
  );
};

export default WishlistComponent;
