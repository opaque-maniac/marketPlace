import { FormEventHandler, useState } from "react";
//import useUserStore from "../../utils/store";

interface Props {
  placeholder?: string;
  initialText?: string;
  isEdit?: boolean;
  buttonText: string;
}

export default function NewComment({
  placeholder = "Add comment...",
  initialText = "",
  isEdit = false,
  buttonText,
}: Props) {
  //const currentUser = useUserStore((state) => state.user);
  const [text, setText] = useState(initialText);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    //handleSubmit(text);
    setText("");
  };

  return (
    <form
      className={isEdit ? "edit-comment" : "new-comment-container"}
      onSubmit={onSubmit}
    >
      <textarea
        className="min-h-[112px]"
        placeholder={placeholder}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      {!isEdit && (
        <img
          className="new-comment-avatar"
          src={`./images/avatars/image-.png`}
          alt={"me"}
        />
      )}
      <button className="submit" type="submit">
        {buttonText}
      </button>
    </form>
  );
}
