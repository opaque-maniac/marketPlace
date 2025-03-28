import { useMutation } from "@tanstack/react-query";
import { deleteWishlistitem } from "../../utils/mutations/customers/deletewishlistitem";
import Loader from "../loader";
import { MouseEventHandler, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  id: string;
  refetch: () => void;
}

export default function DeleteWishlistItemButton({ id, refetch }: Props) {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { isPending, mutate } = useMutation({
    mutationFn: deleteWishlistitem,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <button
      onClick={onclick}
      aria-label="Delete wishlist item"
      className={`h-10 w-full flex justify-center items-center text-white`}
    >
      {isPending ? (
        <div className="w-6 h-6">
          <Loader color="#fff" />
        </div>
      ) : (
        <span>Delete</span>
      )}
    </button>
  );
}
