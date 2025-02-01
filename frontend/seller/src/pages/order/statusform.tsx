import { FormEventHandler, useContext, useEffect, useState } from "react";
import { OrderStatus } from "../../utils/types";
import { useMutation } from "@tanstack/react-query";
import { updateOrder } from "../../utils/mutations/orders/updateorder";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

interface Props {
  orderID: string;
  initialStatus: OrderStatus;
  refetch: () => void;
}

export default function StatusForm({ orderID, initialStatus, refetch }: Props) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>(initialStatus);
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { isPending, mutate } = useMutation({
    mutationFn: updateOrder,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    mutate({ id: orderID, status });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex justify-start items-center gap-2"
    >
      <div>
        <label htmlFor="status" className="sr-only">
          Status
        </label>
        <select
          name="delivered"
          id="delivered"
          value={status}
          disabled={isPending}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-black rounded p-2 block w-40 h-10 bg-gray-50 focus:border-none focus:ring-0"
          onBlur={(e) => setStatus(e.target.value)}
        >
          <option value={"PENDING"}>PENDING</option>
          <option value={"PROCESSING"}>PROCESSING</option>
          <option value={"SHIPPED"}>SHIPPED</option>
          <option value={"READY"}>READY</option>
          <option value={"DELIVERED"}>DELIVERED</option>
          <option value={"CANCELLED"}>DELIVERED</option>
        </select>
      </div>
      {isPending && (
        <div className="w-4 h-4">
          <Loader color="#000" />
        </div>
      )}
    </form>
  );
}
