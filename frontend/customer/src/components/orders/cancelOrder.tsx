import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useContext } from "react";
import { cancelOrder } from "../../utils/mutations/orders";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";

interface Props {
  id: string;
  refetch: () => void;
  callback: () => void;
}

const CancelOrderButton = ({ id, refetch, callback }: Props) => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      callback();
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
    <button
      onClick={clickHandler}
      className="flex justify-center items-center h-10 w-28 bg-white border border-black rounded-lg"
    >
      {mutation.isPending ? <Loader color="#000000" /> : `Cancel Order`}
    </button>
  );
};

export default CancelOrderButton;
