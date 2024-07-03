import { useMutation } from "@tanstack/react-query";
import { useLoggedInStore } from "../../../utils/store";
import sendComment from "./sendComment";
import { FormEventHandler } from "react";
import Loader from "../../../components/loader";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
}

const CommentForm = ({ id }: Props) => {
  const user = useLoggedInStore((state) => state.user);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendComment,
    onSuccess: () => {},
    onError: (error: { message: string }) => {
      if (error.message === "Product not found") {
        navigate("/error/404", { replace: true });
      } else if (error.message === "Token expired") {
        navigate("/logout");
      } else {
        navigate("/error/500", { replace: true });
      }
    },
  });

  const sumbitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("content") as string;
    mutation.mutate({ id, content });
  };

  if (mutation.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={sumbitHandler}>
        <div>
          <label htmlFor="content" className="sr-only">
            Comment
          </label>
          <textarea
            name="content"
            id="content"
            cols={20}
            rows={6}
            maxLength={255}
            minLength={2}
            required
            placeholder="Comment"
            className="lg:w-full md:w-8/12 w-11/12 mx-auto rounded h-24 block p-2 border-b border-r border-black"
          ></textarea>
        </div>
        <div className="w-full flex justify-center items-center pt-4">
          <button
            title={user === null ? "Log In to comment" : undefined}
            disabled={user === null ? true : false}
            type="submit"
            className="block bg-black text-white rounded w-24 h-10"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
