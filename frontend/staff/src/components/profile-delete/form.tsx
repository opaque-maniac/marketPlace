import { Link, useNavigate } from "react-router-dom";
import { errorHandler } from "../../utils/errorHandler";
import { FormEventHandler, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import Loader from "../loader";
import { DeleteDisableMutationFN } from "../../utils/types";

interface Props {
  callback: string;
  success: () => void;
  id: string;
  disable: boolean;
  refetch: () => void;
  mutationFn: DeleteDisableMutationFN;
}

export default function MisconductsInputForm({
  callback,
  success,
  id,
  disable,
  mutationFn,
}: Props) {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { isIdle, mutate } = useMutation({
    mutationFn,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      // refetch
      success();
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const misconductId = formData.get("misconduct") as string;
    mutate({ id, misconductId });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="max-h-[200px] border border-black/20"></div>
      <div className="flex md:flex-row flex-col justify-center items-center md:gap-10 gap-6">
        <button
          aria-label={`Confirm ${disable ? "disable" : "deletion"}`}
          type="submit"
          disabled={!isIdle}
          className="bg-red-500 flex justify-center items-center text-white w-40 h-10 rounded-lg text-center"
        >
          {isIdle ? (
            <span>Confirm</span>
          ) : (
            <div className="w-6 h-6">
              <Loader color="#fff" />
            </div>
          )}
        </button>
        <Link
          to={callback}
          className="bg-green-500 flex justify-center items-center text-white w-40 h-10 rounded-lg text-center"
        >
          Go back
        </Link>
      </div>
    </form>
  );
}
