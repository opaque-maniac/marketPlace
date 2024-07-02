import { useMutation } from "@tanstack/react-query";
import CartIcon from "../../../components/icons/cartIcon";
import { useLoggedInStore } from "../../../utils/store";
import sendAddToCart from "../../home/components/first/sendAddToCart";
import { MouseEventHandler } from "react";
import Loader from "../../../components/loader";

interface Props {
  id: string;
}

const AddToCartButton = ({ id }: Props) => {
  const user = useLoggedInStore((state) => state.user);

  const mutation = useMutation({
    mutationFn: sendAddToCart,
    onSuccess: () => {},
    onError: () => {},
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
