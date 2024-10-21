import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MouseEventHandler, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { removeFromCart } from "../../utils/mutations/cart";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import Loader from "../loader";

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
        onClick={clickHandler}
        disabled={mutation.isPending}
        className="block h-10 w-20 bg-red-500 text-white rounded-lg"
      >
        {mutation.isPending ? (
          <div className="h-10 w-10 p-1 mx-auto">
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
