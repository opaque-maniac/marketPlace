import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MouseEventHandler, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import Loader from "../loader";
import { errorHandler } from "../../utils/errorHandler";
import { orderCartItem } from "../../utils/mutations/cart/ordercartitem";

interface Props {
  id: string;
  refetch: () => void;
}

const OrderCartItem = ({ id, refetch }: Props) => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const mutation = useMutation({
    mutationFn: orderCartItem,
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
        aria-label="Order cart item"
        className={`block h-10 w-20 bg-green-500 text-white rounded-lg ${
          mutation.isPending ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {mutation.isPending ? (
          <div className="h-8 w-8 p-1 mx-auto">
            <Loader color="#fff" />
          </div>
        ) : (
          "Order"
        )}
      </button>
    </div>
  );
};

export default OrderCartItem;
