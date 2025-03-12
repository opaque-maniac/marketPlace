import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../utils/errorContext";
import Loader from "./loader";
import { errorHandler } from "../utils/errorHandler";
import { enableProfile } from "../utils/mutations/enableprofile";

interface Props {
  id: string;
  refetch: () => void;
  type: "customer" | "staff" | "seller";
}

export default function EnableProfileButton({ id, refetch, type }: Props) {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { isPending, mutate } = useMutation({
    mutationFn: enableProfile,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate({ id, type });
  };

  return (
    <button
      onClick={onclick}
      disabled={isPending}
      aria-label="Enable profile"
      className="flex justify-center items-center w-40 h-10 bg-blue-500 text-white rounded"
    >
      {isPending ? (
        <div className="w-6 h-6">
          <Loader color="#fff" />
        </div>
      ) : (
        <span>Enable</span>
      )}
    </button>
  );
}
