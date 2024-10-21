import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../icons/cart";
import useFetchCart from "../../utils/hooks/cart";
import { useContext, useEffect } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";

const CartComponent = () => {
  const { cart, e } = useFetchCart();
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
