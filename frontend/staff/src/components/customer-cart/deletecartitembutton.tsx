import { MouseEventHandler, useContext } from "react";
import BinIcon from "../icons/bin";
import { useMutation } from "@tanstack/react-query";
import { deleteCartItem } from "../../utils/mutations/customers/deletecartitem";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../loader";

interface Props {
  id: string;
  refetch: () => void;
}

export default function DeleteCartItemButton({ id, refetch }: Props) {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { isPending, mutate } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      aria-label="Delete cart item"
      className="flex justify-start items-center gap-[4px] w-20 h-10 bg-red-500 text-white px-2"
    >
      <div className="h-8 w-8">
        {isPending ? <Loader color="#fff" /> : <BinIcon />}
      </div>
      <p>Delete</p>
    </button>
  );
}
