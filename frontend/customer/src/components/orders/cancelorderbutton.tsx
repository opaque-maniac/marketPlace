import { MouseEventHandler, useContext, useState } from "react";
import Modal from "../modal";
import { useMutation } from "@tanstack/react-query";
import Loader from "../loader";
import { cancelOrder } from "../../utils/mutations/orders/cancelorder";
import { errorHandler } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";

interface Props {
  orderID: string;
  refetch: () => void;
}

export default function CancelOrderButtonComponent({
  refetch,
  orderID,
}: Props) {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);
  const [clicked, setClicked] = useState<boolean>(false);

  const clickHadler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  const callback = () => {
    setClicked((prev) => !prev);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      setTimeout(() => {
        refetch();
      }, 100);
      callback();
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const confirmHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate({ id: orderID });
  };

  const cancelHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    callback();
  };

  return (
    <div>
      <button
        aria-label="Cancel order"
        onClick={clickHadler}
        className="flex justify-center items-center w-40 h-10 text-white bg-red-500 rounded"
      >
        <span>Cancel</span>
      </button>
      {clicked && (
        <Modal callback={callback}>
          <div className="w-screen h-screen flex justify-center items-center">
            <section className="bg-white md:w-5/12 w-11/12">
              <div>
                <h3>Are you sure?</h3>
              </div>
              <div className="flex md:justify-around justify-center items-center md:gap-0 gap-4">
                <button
                  aria-label="Go back to order"
                  disabled={isPending}
                  className="rounded flex justify-center items-center text-white bg-green-500"
                  onClick={cancelHandler}
                >
                  <span>Cancel</span>
                </button>
                <button
                  aria-label="Confirm cancelling order"
                  disabled={isPending}
                  className="rounded flex justify-center items-center text-white bg-green-500 p-2"
                  onClick={confirmHandler}
                >
                  {isPending ? <Loader color="#000" /> : <span>Confirm</span>}
                </button>
              </div>
            </section>
          </div>
        </Modal>
      )}
    </div>
  );
}
