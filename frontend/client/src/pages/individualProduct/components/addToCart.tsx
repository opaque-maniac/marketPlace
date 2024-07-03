import { useMutation } from "@tanstack/react-query";
import CartIcon from "../../../components/icons/cartIcon";
import { useLoggedInStore } from "../../../utils/store";
import sendAddToCart from "../../home/components/first/sendAddToCart";
import { MouseEventHandler, useContext } from "react";
import Loader from "../../../components/loader";
import { useNavigate } from "react-router-dom";
import ErrorContext from "../../../utils/errorContext";

interface Props {
  id: string;
}

const AddToCartButton = ({ id }: Props) => {
  const user = useLoggedInStore((state) => state.user);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendAddToCart,
    onSuccess: () => {},
    onError: (error: { message: string }) => {
      if (error.message === "Product not found") {
        navigate("/error/404", { replace: true });
      } else if (error.message === "Token expired") {
        navigate("/logout");
      } else {
        setError(true);
        navigate("/error/500", { replace: true });
      }
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (user) {
      mutation.mutate(id);
    }
  };

  return (
    <button
      onClick={clickHandler}
      disabled={!user || mutation.isLoading}
      className="flex justify-start items-center p-1 bg-black text-white rounded gap-1"
    >
      <div className="w-8 h-7">
        {mutation.isLoading && <Loader />}
        {!mutation.isLoading && <CartIcon />}
      </div>
      <p>Add To Cart</p>
    </button>
  );
};

export default AddToCartButton;
