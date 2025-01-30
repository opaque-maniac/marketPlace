import { useMutation } from "@tanstack/react-query";
import TrashIcon from "../../components/icons/trash";
import Transition from "../../components/transition";
import { deleteComment } from "../../utils/mutations/comments/deletecomment";
import { MouseEventHandler, useContext } from "react";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  id: string;
  productId: string;
  refetch: () => void;
}

const DeleteComment = ({ id, productId, refetch }: Props) => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const mutation = useMutation({
    mutationFn: deleteComment,
    onError: (error: Error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ productId, commentId: id });
  };

  const disable = mutation.isPending ? true : false;
  return (
    <Transition>
      <button
        disabled={disable}
        onClick={clickHandler}
        className={`flex justify-start items-center gap-2 border border-black h-8 p-2 rounded-sm bg-white ${
          disable ? "cursor-not-allowed" : "cursor-pointer"
        }`}
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
