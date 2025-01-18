import { Link } from "react-router-dom";
import HeartIcon from "../icons/heart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import { useContext } from "react";
import errorHandler from "../../utils/errorHandler";
import { getAccessToken } from "../../utils/cookies";
import { fetchData } from "../../utils/hooks/fetchfunc";
import { ErrorResponse } from "../../utils/types";
import { apiHost, apiProtocol } from "../../utils/generics";

const WishlistComponent = () => {
  const [wishlist, setWishlist] = useState<number>(0);
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      navigate("/logout");
      return;
    }

    interface WishlistResponse {
      count: number;
    }

    async function fetchCart() {
      try {
        const count = await fetchData<WishlistResponse>(
          `${apiProtocol}://${apiHost}/customers/wishlist/wishlistcount`,
          token as string,
        );
        setWishlist(count.count);
      } catch (error) {
        if (error instanceof Error) {
          try {
            const errorObj = JSON.parse(error.message) as ErrorResponse;
            const [show, url] = errorHandler(errorObj.errorCode);

            if (show) {
              setErr(errorObj.message);
            } else {
              if (url) {
                if (url === "/500") {
                  setError(true);
                }
                navigate(url, { replace: true });
              } else {
                setError(true);
                navigate("/500", { replace: true });
              }
            }
          } catch (e) {
            if (e instanceof Error) {
              setErr("Something unexpected happened");
            }
            navigate("/", { replace: true });
          }
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
