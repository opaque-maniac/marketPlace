import { useMutation } from "@tanstack/react-query";
import CancelIcon from "../icons/cancel";
import { cancelOrder } from "../../utils/mutations/orders/cancelorder";
import { MouseEventHandler, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { ErrorResponse, OrderStatus } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";

interface Props {
  id: string;
  status: OrderStatus;
  refetch: () => void;
}

const CancelOrderButton = ({ id, refetch, status }: Props) => {
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      refetch();
    },
    onError: (error: Error) => {
      try {
        const errorObj = JSON.parse(error.message) as ErrorResponse;
        const [show, url] = errorHandler(errorObj.errorCode);

        if (show) {
          setErr(errorObj.message);
        } else {
          if (url) {
            if (url === "/500") {
              setError(true);
            }
            navigate(url, { replace: true });
          } else {
            setError(true);
            navigate("/500", { replace: true });
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          setErr("Something unexpected happened");
        }
      }
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ id });
  };

  return (
    <div>
      <button
        aria-label={
          status === "CANCELLED" ? "Order is already cancelled" : "Cancel order"
        }
        onClick={clickHandler}
        disabled={
          mutation.isError || mutation.isPending || status === "CANCELLED"
        }
        className="w-40 h-10 rounded-md flex justify-center items-center gap-4 text-white bg-red-500"
      >
        <span className="font-semibold">
          {status === "CANCELLED" ? "Cancelled" : "Cancel"}
        </span>
        <div className="h-8 w-8">
          {mutation.isPending ? <Loader color="#ffffff" /> : <CancelIcon />}
        </div>
      </button>
    </div>
  );
};

export default CancelOrderButton;
