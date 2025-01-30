import { MouseEventHandler, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useMutation } from "@tanstack/react-query";
import Transition from "../transition";
import Loader from "../loader";
import TrashIcon from "../icons/trash";
import { removeFromWishlist } from "../../utils/mutations/wishlist/removefromwishlist";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  id: string;
  refetch: () => void;
}

const RemoveWishlistItem = ({ id, refetch }: Props) => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const mutation = useMutation({
    mutationFn: removeFromWishlist,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ id });
  };

  const disable = mutation.isPending ? true : false;
  const cursor = mutation.isPaused ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <Transition>
      <button
        disabled={disable}
        onClick={clickHandler}
        className={`h-8 w-8 rounded-full bg-white p-1 flex justify-center items-center border border-black/20 ${cursor}`}
      >
        {mutation.isPending ? <Loader color="#000" /> : <TrashIcon />}
      </button>
    </Transition>
  );
};

export default RemoveWishlistItem;
