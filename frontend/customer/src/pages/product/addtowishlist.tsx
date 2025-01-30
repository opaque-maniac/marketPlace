import { MouseEventHandler, useContext } from "react";
import useUserStore from "../../utils/store";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addToWishlist } from "../../utils/mutations/wishlist/addtowishlist";
import Loader from "../../components/loader";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  id: string;
}

const AddToWishlist = ({ id }: Props) => {
  const user = useUserStore((state) => state.user);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      navigate("/wishlist");
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ productID: id });
  };

  const disable = !user || mutation.isPending;
  const cursor = disable ? "cursor-not-allowed" : "cursor pointer";

  return (
    <button
      disabled={!user}
      onClick={clickHandler}
      title={user ? "Add product to wishlist" : "Log in to take this action"}
      aria-label={
        user ? "Add product to wishlist" : "Log in to take this action"
      }
      className={`rounded h-10 w-40 bg-red-400 text-white ${cursor}`}
    >
      {mutation.isPending ? (
        <div className="h-10 w-10 py-1 mx-auto">
          <Loader color="#ffffff" />
        </div>
      ) : (
        "Add To Wishlist"
      )}
    </button>
  );
};

export default AddToWishlist;
