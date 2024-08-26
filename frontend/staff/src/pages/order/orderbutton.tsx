import { useMutation } from "@tanstack/react-query";
import { updateOrder } from "../../utils/mutations/orders";
import { MouseEventHandler } from "react";
import Loader from "../../components/loader";

interface Props {
  ready: boolean;
  onSuccess: () => void;
  id: string;
}

const OrderButton = ({ ready, onSuccess, id }: Props) => {
  const mutaton = useMutation({
    mutationFn: updateOrder,
    onSuccess: (data) => {
      if (data) {
        onSuccess();
      }
    },
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutaton.mutate({ id });
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ready ? "Order is already ready" : "Make order ready"}
      className="block w-40 h-10 rounded-lg text-center bg-green-500 text-white"
      disabled={ready}
    >
      {mutaton.isPending ? (
        <Loader color="#ffffff" />
      ) : (
        <>{ready ? "Ready" : "Make Ready"}</>
      )}
    </button>
  );
};

export default OrderButton;
