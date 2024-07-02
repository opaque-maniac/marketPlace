import clsx from "clsx";
import CartIcon from "../../../../components/icons/cartIcon";
import { useLoggedInStore } from "../../../../utils/store";
import { useMutation } from "@tanstack/react-query";
import sendAddToCart from "./sendAddToCart";
import Loader from "../../../../components/loader";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  color: string;
}

const AddToCartButton = ({ id, color }: Props) => {
  const user = useLoggedInStore((state) => state.user);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendAddToCart,
    onSuccess: () => {
      navigate("/cart");
    },
    onError: () => {},
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate(id);
  };

  return (
    <button
      disabled={!user || mutation.isLoading}
      onClick={clickHandler}
      title={!user ? "Please login to add to cart" : undefined}
      className={clsx(
        "h-8 w-9/12 mx-auto rounded flex justify-center items-center gap-4",
        {
          "bg-white text-black": color === "white",
          "bg-black text-white": color === "black",
        }
      )}
    >
      {mutation.isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="h-6 w-6">
          <CartIcon />
        </div>
      )}
      <p>Add To Cart</p>
    </button>
  );
};

export default AddToCartButton;
