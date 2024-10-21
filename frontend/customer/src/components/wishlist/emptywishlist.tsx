import { useMutation } from "@tanstack/react-query";
import { emptyWishlist } from "../../utils/mutations/wishlist";
import { MouseEventHandler, useContext, useState } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import SuccessComponent from "../success";
import Loader from "../loader";

interface Props {
  refetch: () => void;
  disable: boolean;
}

const EmptyWishlist = ({ refetch, disable }: Props) => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: emptyWishlist,
    onError: (error) => {
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
    onSuccess: () => {
      setSuccess(() => true);
      setTimeout(() => {
        setSuccess(() => false);
      }, 3000);
      refetch();
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      {success && <SuccessComponent message="Wishlist emptied" />}
      <button
        onClick={clickHandler}
        aria-label="Empty wishlist"
        disabled={disable}
        className="block h-10 w-40 bg-red-400 text-white rounded-md"
      >
        {mutation.isPending ? (
          <div className="h-10 w-10 py-1 mx-auto">
            <Loader color="#fff" />
          </div>
        ) : (
          "Empty Wishlist"
        )}
      </button>
    </>
  );
};

export default EmptyWishlist;
