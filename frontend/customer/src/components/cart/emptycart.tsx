import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useContext, useState } from "react";
import {
  ErrorContext,
  ShowErrorContext,
  ShowMessageContext,
} from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import { emptyCart } from "../../utils/mutations/cart/emptycart";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  refetch: () => void;
  disable: boolean;
}

const EmptyCart = ({ refetch, disable }: Props) => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [, setMessage] = useContext(ShowMessageContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: emptyCart,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      refetch();
      setMessage("Cart emptied");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
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
        aria-label="Empty cart"
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
          "Empty Cart"
        )}
      </button>
    </>
  );
};

export default EmptyCart;
