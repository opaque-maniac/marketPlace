import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useContext } from "react";
import { addToCart } from "../../utils/mutations/cart/addtocart";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  id: string;
}

const WishlistAddToCart = ({ id }: Props) => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { isPending, mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      navigate("/cart");
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate({ productID: id, quantity: 1 });
  };

  const disable = isPending ? true : false;
  const cursor = disable ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <div className="h-10 w-full bg-black">
      <button
        aria-label="Add to cart"
        title="Add to cart"
        disabled={disable}
        onClick={clickHanlder}
        className={`h-10 w-full flex justify-center items-center text-white ${cursor}`}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default WishlistAddToCart;
