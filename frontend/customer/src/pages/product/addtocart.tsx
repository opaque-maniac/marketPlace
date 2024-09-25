import { useMutation } from "@tanstack/react-query";
import useUserStore from "../../utils/store";
import { addToCart } from "../../utils/mutations/cart";
import { MouseEventHandler, useContext } from "react";
import Loader from "../../components/loader";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  color: string;
  text: string;
}

const AddToCart = ({ id, color, text }: Props) => {
  const user = useUserStore((state) => state.user);
  const cart = useUserStore((state) => state.cart);
  const setCart = useUserStore((state) => state.setCart);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      if (data && data.cartItem) {
        if (cart && data.new) {
          setCart(cart + 1);
        }
        navigate("/cart");
      } else {
        setErr("An unexpected error occurred.");
      }
    },
    onError: (error) => {
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
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ productID: id, quantity: 1 });
  };

  return (
    <button
      disabled={!user}
      onClick={clickHandler}
      title={user ? "Add product to cart" : "Log in to take this action"}
      className={`rounded h-10 w-40 bg-${color} text-${text}`}
    >
      {mutation.isPending ? (
        <div className="h-8 w-8 pt-1 mx-auto">
          <Loader color={color === "white" ? "#000" : "#fff"} />
        </div>
      ) : (
        "Add To Cart"
      )}
    </button>
  );
};

export default AddToCart;
