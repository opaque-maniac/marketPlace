import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { updateCartItem } from "../../utils/mutations/cart/updatecartitem";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  quantity: number;
  id: string;
  inventory: number;
}

const CartQuantity = ({ quantity, id, inventory }: Props) => {
  const [ammount, setAmmount] = useState<number>(quantity);
  const [added, setAdded] = useState<boolean>(false);

  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    mutation.mutate({ id, quantity: ammount });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ammount]);

  const mutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      setAdded(() => false);
    },
    onError: (error: Error) => {
      if (added) {
        setAmmount((prev) => prev - 1);
      } else {
        setAmmount((prev) => prev + 1);
      }
      setAdded(false);
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const disablePrev = mutation.isPending || ammount <= 1;

  const handleMinus: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (ammount > 1) {
      setAmmount((prev) => prev - 1);
    }
  };

  const disableNext = mutation.isPending || ammount >= inventory;

  const handlePlus: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (ammount < inventory) {
      setAmmount((prev) => prev + 1);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <button
          disabled={disablePrev}
          onClick={handleMinus}
          className={`h-10 w-10 rounded-tl-lg rounded-bl-lg flex justify-center items-center border border-black/25 ${
            disablePrev ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <span>-</span>
        </button>
      </div>
      <div className="h-10 w-10 border-b border-t border-black/25 flex justify-center items-center">
        {mutation.isPending ? (
          <div className="h-10 w-10 mx-auto p-1">
            <Loader color="#000" />
          </div>
        ) : (
          <span>{ammount}</span>
        )}
      </div>
      <div>
        <button
          onClick={handlePlus}
          disabled={disableNext}
          className={`h-10 w-10 rounded-tr-lg rounded-br-lg flex justify-center items-center border border-black/25 ${
            disableNext ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <span>+</span>
        </button>
      </div>
    </div>
  );
};

export default CartQuantity;
