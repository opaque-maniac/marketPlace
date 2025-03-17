import { FormEventHandler, useContext, useState } from "react";
import { getProfileImage } from "../../utils/cookies";
import { apiHost, apiProtocol } from "../../utils/generics";
import { useMutation } from "@tanstack/react-query";
import { sendComment } from "../../utils/mutations/comments/sendcomment";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../loader";
//import useUserStore from "../../utils/store";

interface Props {
  placeholder?: string;
  initialText?: string;
  initialID?: string;
  isEdit?: boolean;
  isReplying?: boolean;
  commentID?: string;
  productID?: string;
  buttonText: string;
  refetch: () => void;
}

export default function NewComment({
  placeholder = "Add comment...",
  initialText = "",
  initialID,
  isEdit = false,
  isReplying = false,
  productID,
  buttonText,
  refetch,
}: Props) {
  //const currentUser = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const [text, setText] = useState(initialText);
  const profileImage = getProfileImage();

  const { isPending, mutate } = useMutation({
    mutationFn: sendComment,
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
    onSuccess: () => {
      setText("");
      refetch();
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    mutate({
      message,
      productID,
      edit: isEdit,
      reply: isReplying,
      id: initialID,
    });
  };

  const baseStyle =
    "flex md:flex-row flex-col justify-center md:gap-4 gap-[10px]";
  const editStyle = `${baseStyle}`;
  const newStyle = `${baseStyle}`;

  return (
    <form className={isEdit ? editStyle : newStyle} onSubmit={onSubmit}>
      {!isEdit && (
        <img
          src={
            profileImage
              ? `${apiProtocol}://${apiHost}/${profileImage}`
              : "/images/profile.svg"
          }
          alt={"me"}
          className="w-[32px] h-[32px] rounded-full md:block hidden"
        />
      )}
      <label htmlFor="message" className="sr-only">
        {placeholder}
      </label>
      <textarea
        className="md:min-h-[112px] min-h-[130px] xl:w-[600px] md:w-[450px] w-11/12 border block md:mx-0 mx-auto p-[5px]"
        placeholder={placeholder}
        name="message"
        id="message"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="md:block flex justify-between md:px-0 px-4">
        {!isEdit && (
          <img
            src={
              profileImage
                ? `${apiProtocol}://${apiHost}/${profileImage}`
                : "/images/profile.svg"
            }
            alt={"me"}
            className="w-[32px] h-[32px] rounded-full md:hidden block"
          />
        )}
        <button
          className={`flex justify-center items-center xl:w-20 md:w-[50px] w-40 md:h-10 ${isEdit || isReplying ? "h-10" : "h-12"} p-1 md:rounded-sm rounded-lg bg-blue-300`}
          type="submit"
        >
          {isPending ? (
            <div className="w-6 h-6">
              <Loader color="#fff" />
            </div>
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
      </div>
    </form>
  );
}
