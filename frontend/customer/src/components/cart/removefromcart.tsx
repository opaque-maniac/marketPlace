import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MouseEventHandler, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { removeFromCart } from "../../utils/mutations/cart/removefromcart";
import Loader from "../loader";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  id: string;
  refetch: () => void;
}

const RemoveFromCart = ({ id, refetch }: Props) => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const mutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ id });
  };

  return (
    <div>
      <button
        onClick={clickHandler}
        disabled={mutation.isPending}
        aria-label="Remove from cart"
        className={`block h-10 w-20 bg-red-500 text-white rounded-lg ${
          mutation.isPending ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {mutation.isPending ? (
          <div className="h-8 w-8 p-1 mx-auto">
            <Loader color="#000" />
          </div>
        ) : (
          "Remove"
        )}
      </button>
    </div>
  );
};

export default RemoveFromCart;
