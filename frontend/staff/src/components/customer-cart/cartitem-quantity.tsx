import { MouseEventHandler, useContext, useState } from "react";
import ChevronDown from "../icons/chevrondown";
import ChevronUp from "../icons/chevronup";
import { useMutation } from "@tanstack/react-query";
import { updateCartItem } from "../../utils/mutations/customers/updatecartitem";
import { errorHandler } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import Loader from "../loader";

interface Props {
  initial: number;
  id: string;
}

//const regex = /^\d+(\.\d+)?$/;

export default function CartItemQuantity({ initial, id }: Props) {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const [quantity, setQuantity] = useState<number>(initial);

  const { isPending, mutate } = useMutation({
    mutationFn: updateCartItem,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: (data) => {
      setQuantity(data.quantity);
    },
  });

  const incrementClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const newQuantity = quantity + 1;
    mutate({ id, quantity: newQuantity });
  };

  const decrementClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const newQuantity = quantity - 1;
    if (newQuantity > 0) {
      mutate({ id, quantity: newQuantity });
    }
  };

  return (
    <div className="flex my-[10px] border border-black/20 h-10 w-[60px] items-center">
      {isPending ? (
        <div className="flex justify-center items-center w-10 h-8">
          <div className="w-4 h-4">
            <Loader color="#000" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-10 h-8">
          <span>{quantity}</span>
        </div>
      )}
      <div className="h-8">
        <button
          onClick={incrementClick}
          disabled={isPending}
          aria-label="Increment quantity"
          className="block h-4 w-5"
        >
          <ChevronUp />
        </button>
        <button
          onClick={decrementClick}
          disabled={isPending}
          aria-label="Decrement quantity"
          className="block h-4 w-5"
        >
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}
