import { useMutation } from "@tanstack/react-query";
import useUserStore from "../../utils/store";
import { addToCart } from "../../utils/mutations/cart/addtocart";
import { MouseEventHandler, useContext } from "react";
import Loader from "../../components/loader";
import { ShowErrorContext, ErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  id: string;
  color: string;
  text: string;
}

const AddToCart = ({ id, color, text }: Props) => {
  const user = useUserStore((state) => state.user);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addToCart,
    onError: (error: Error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ productID: id, quantity: 1 });
  };

  const disable = !user || mutation.isPending;
  const cursor = disable ? "cursor-not-allowed" : "cursor pointer";

  return (
    <button
      disabled={disable}
      onClick={clickHandler}
      title={user ? "Add product to cart" : "Log in to take this action"}
      className={`rounded h-10 w-40 bg-${color} text-${text} ${cursor}`}
    >
      {mutation.isPending ? (
        <div className="h-8 w-8 pt-1 mx-auto py-1">
          <Loader color={color === "white" ? "#000" : "#fff"} />
        </div>
      ) : (
        "Add To Cart"
      )}
    </button>
  );
};

export default AddToCart;
