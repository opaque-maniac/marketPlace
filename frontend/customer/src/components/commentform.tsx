import { useMutation } from "@tanstack/react-query";
import { sendComment } from "../utils/mutations/comments";
import { FormEventHandler, useContext, useRef, useState } from "react";
import { ErrorResponse } from "../utils/types";
import errorHandler from "../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../utils/errorContext";
import { useNavigate } from "react-router-dom";
import SendIcon from "./icons/send";
import Loader from "./loader";
import SuccessComponent from "./success";

interface Props {
  id: string;
  refetch: () => void;
}

const CommentForm = ({ id, refetch }: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement>(null);

  const mutation = useMutation({
    mutationFn: sendComment,
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
      if (ref.current) {
        ref.current.reset();
      }
      setSuccess(true);
      refetch();
      setTimeout(() => {
        setSuccess(false);
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
      {success && <SuccessComponent message="Successfully Sent Comment" />}
      <form
        ref={ref}
        onSubmit={submitHandler}
        className="flex justify-center items-center gap-4 px-4 w-full pb-4"
      >
        <div className="w-10/12">
          <label htmlFor="message" className="sr-only">
            Comment Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Enter comment"
            className="block h-14 w-full border focus:border border-black px-1"
            maxLength={225}
            minLength={10}
          ></textarea>
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
