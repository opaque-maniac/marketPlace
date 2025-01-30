import { useMutation } from "@tanstack/react-query";
import { emptyWishlist } from "../../utils/mutations/wishlist/emptywishlist";
import { MouseEventHandler, useContext, useState } from "react";
import {
  ErrorContext,
  ShowErrorContext,
  ShowMessageContext,
} from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  refetch: () => void;
  disable: boolean;
}

const EmptyWishlist = ({ refetch, disable }: Props) => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [, setMessage] = useContext(ShowMessageContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: emptyWishlist,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      setMessage("Wishlist emptied");
      setTimeout(() => {
        setMessage(null);
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
      <button
        onClick={clickHandler}
        aria-label="Empty wishlist"
        disabled={disable}
        className={`block h-10 w-40 bg-red-400 text-white rounded-md ${
          disable ? "cursor-not-allowed" : "cursor-pointer"
        }`}
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
