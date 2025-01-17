import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../icons/cart";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../utils/hooks/fetchfunc";
import { getAccessToken } from "../../utils/cookies";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { apiHost, apiProtocol } from "../../utils/generics";

const CartComponent = () => {
  const [cart, setCart] = useState<number>(0);
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      navigate("/logout");
      return;
    }

    interface CartResponse {
      count: number;
    }

    async function fetchCart() {
      try {
        const count = await fetchData<CartResponse>(
          `${apiProtocol}://${apiHost}/customers/cart/count`,
          token as string,
        );
        setCart(count.count);
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
        to={"/cart"}
        aria-label="Go to the cart page"
        className="block w-6 h-6 rounded-full relative"
      >
        <div className="absolute bg-red-400 h-4 w-4 -top-1  rounded-full -right-2 flex justify-center items-center">
          <span className="text-white">{cart}</span>
        </div>
        <CartIcon />
      </Link>
    </div>
  );
};

export default CartComponent;
