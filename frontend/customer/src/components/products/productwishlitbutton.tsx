import { MouseEventHandler, useContext } from "react";
import HeartIcon from "../icons/heart";
import { useMutation } from "@tanstack/react-query";
import { addToWishlist } from "../../utils/mutations/wishlist/addtowishlist";
import { errorHandler } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import useUserStore from "../../utils/store";
import Loader from "../loader";

interface Props {
  productID: string;
}

const ProductWishlistButton = ({ productID }: Props) => {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const user = useUserStore((state) => state.user);

  const { isPending, mutate } = useMutation({
    mutationFn: addToWishlist,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      setErr("");
    },
  });

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate({ productID });
  };

  const disable = !user || isPending;

  return (
    <button
      onClick={clickHanlder}
      disabled={disable}
      aria-label="Add To Wishlist"
      title={!user ? "Login to add to wishlist" : "Add product to wishlist"}
      className={`h-8 w-8 flex justify-center items-center rounded-full pl-1 pr-1 bg-white border border-black/15 ${
        isPending ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {isPending ? <Loader color="#000" /> : <HeartIcon />}
    </button>
  );
};

export default ProductWishlistButton;
