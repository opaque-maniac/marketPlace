import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { updateCartItem } from "../../utils/mutations/cart";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";

interface Props {
  quantity: number;
  id: string;
}

const CartQuantity = ({ quantity, id }: Props) => {
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
        setAmmount(() => ammount - 1);
      } else {
        setAmmount(() => ammount + 1);
      }
      setAdded(false);
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

  const handleMinus: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (ammount !== 1) {
      setAmmount(() => ammount - 1);
    }
  };

  const handlePlus: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setAdded(() => true);
    setAmmount(() => ammount + 1);
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <button
          disabled={quantity === 1 || mutation.isPending}
          onClick={handleMinus}
          className="h-10 w-10 rounded-tl-lg rounded-bl-lg flex justify-center items-center border border-black/25"
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
          disabled={mutation.isPending}
          className="h-10 w-10 rounded-tr-lg rounded-br-lg flex justify-center items-center border border-black/25"
        >
          <span>+</span>
        </button>
      </div>
    </div>
  );
};

export default CartQuantity;
