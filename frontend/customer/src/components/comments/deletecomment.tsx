import { MouseEventHandler, useContext } from "react";
import BinIcon from "../icons/bin";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../loader";
import { deleteComment } from "../../utils/mutations/comments/deletecomment";

interface Props {
  commentID: string;
  refetch: () => void;
}

export default function DeleteCommentButton({ commentID, refetch }: Props) {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { isPending, mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate(commentID);
  };

  return (
    <button
      onClick={onclick}
      aria-label="Delete comment"
      className="flex justify-center items-center md:w-[104px] w-[40px] h-[34px] bg-red-400 rounded-lg gap-[5px] text-white"
    >
      <div className="w-[20px] h-[30px] gap-1">
        {isPending ? <Loader color="#fff" /> : <BinIcon />}
      </div>
      <span className="font-semibold text-lg md:inline hidden">Delete</span>
    </button>
  );
}
