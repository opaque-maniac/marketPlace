import { useMutation } from "@tanstack/react-query";
import TickIcon from "../../components/icons/tick";
import { makeOrderDelivered } from "../../utils/mutations/orders";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { MouseEventHandler, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

interface Props {
  id: string;
  ready: boolean;
  delivered: boolean;
  refetch: () => void;
}

const DeliveredButton = ({ id, ready, delivered, refetch }: Props) => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: makeOrderDelivered,
    onError: (error) => {
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
    },
    onSuccess: () => {
      refetch();
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ id });
  };

  return (
    <button
      onClick={clickHandler}
      disabled={delivered || ready || mutation.isPending || mutation.isSuccess}
      className="flex justify-center items-center gap-4 h-10 w-32 bg-green-400 px-1 rounded-md"
    >
      <span className="text-md text-white">
        {delivered ? "Delivered" : "Set Delived"}
      </span>
      <div className="w-6 h-6 text-white rounded-full border border-white">
        {mutation.isPending ? <Loader color="#ffffff" /> : <TickIcon />}
      </div>
    </button>
  );
};

export default DeliveredButton;
