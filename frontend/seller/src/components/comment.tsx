import { useState } from "react";
import { Comment } from "../utils/types";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="w-11/12 border-b border-black mx-auto mb-4">
      <div>
        {comment.message.length > 50 ? (
          <>
            {!clicked ? (
              <p>{comment.message.substring(0, 50)}...</p>
            ) : (
              <p>{comment.message}</p>
            )}
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setClicked(!clicked);
                }}
                className="bg-transparent underline"
              >
                {clicked ? "Show Less" : "Show More"}
              </button>
            </div>
          </>
        ) : (
          <div>
            <p>{comment.message}</p>
          </div>
        )}
      </div>
      <div>
        <span>{comment.createdAt}</span>
      </div>
    </div>
  );
};

export default CommentItem;
