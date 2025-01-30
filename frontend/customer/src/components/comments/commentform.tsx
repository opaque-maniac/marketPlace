import { useMutation } from "@tanstack/react-query";
import { sendComment } from "../../utils/mutations/comments/sendcomment";
import { FormEventHandler, useContext, useRef, useState } from "react";
import {
  ErrorContext,
  ShowErrorContext,
  ShowMessageContext,
} from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import SendIcon from "../icons/send";
import Loader from "../loader";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  id: string;
  refetch: () => void;
}

const CommentForm = ({ id, refetch }: Props) => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [, setMessage] = useContext(ShowMessageContext);
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement>(null);

  const mutation = useMutation({
    mutationFn: sendComment,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      if (ref.current) {
        ref.current.reset();
      }
      setMessage("Comment sent successfully");
      refetch();
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    mutation.mutate({ message, id });
  };

  return (
    <div className="w-full">
      <form
        ref={ref}
        onSubmit={submitHandler}
        className="flex justify-center items-center gap-4 px-4 w-full pb-4"
      >
        <div className="w-10/12">
          <label htmlFor="message" className="sr-only">
            Comment Message
          </label>
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Enter comment"
            className="block h-14 w-full border focus:border border-black px-1"
            maxLength={225}
            minLength={10}
          />
        </div>
        <div>
          <button
            className="block h-8 w-8 border border-black rounded-md p-1"
            type="submit"
          >
            {mutation.isPending ? <Loader color="#000" /> : <SendIcon />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
