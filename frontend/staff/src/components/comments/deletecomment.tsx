import { useMutation } from "@tanstack/react-query";
import TrashIcon from "../../components/icons/trash";
import Transition from "../../components/transition";
import { deleteComment } from "../../utils/mutations/comments";
import { MouseEventHandler, useContext } from "react";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";

interface Props {
  id: string;
  refetch: () => void;
}

const DeleteComment = ({ id, refetch }: Props) => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const mutation = useMutation({
    mutationFn: deleteComment,
    onError: (error: Error) => {
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
        navigate("/", { replace: true });
      }
    },
    onSuccess: () => {
      refetch();
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ id });
  };

  return (
    <Transition>
      <button
        disabled={mutation.isIdle ? false : true}
        onClick={clickHandler}
        className="flex justify-start items-center gap-2 border border-black h-8 p-2 rounded-sm bg-white"
      >
        <div className="h-6 w-6">
          {mutation.isPending ? <Loader color="#000" /> : <TrashIcon />}
        </div>
        <span className="text-sm">Delete</span>
      </button>
    </Transition>
  );
};

export default DeleteComment;
