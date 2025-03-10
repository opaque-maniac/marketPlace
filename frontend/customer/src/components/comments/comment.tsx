import { useState } from "react";
import { Comment } from "../../utils/types";
import ProfileIcon from "../icons/profileIcon";
import Transition from "../transition";
import EllipseIcon from "../icons/ellipse";
import DeleteComment from "./deletecomment";
import useUserStore from "../../utils/store";
import { formatDate } from "../../utils/date";

interface Props {
  comment: Comment;
  productId: string;
  refetch: () => void;
}

const CommentItem = ({ comment, productId, refetch }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const hidden = user === comment.customerID ? "" : "hidden";

  return (
    <Transition>
      <div className="p-1 w-full border border-black rounded-md">
        <div className="w-full">
          <div className="flex justify-between items-center px-2">
            <div className="flex justify-start items-center gap-4">
              <div className="bg-blue-400 h-10 w-10 rounded-full p-2">
                {comment.customer.image ? (
                  <img
                    src={`http://localhost:3020/${comment.customer.image.url}`}
                    alt={`${comment.customer.firstName} profile`}
                    className="h-full w-full rounded-full"
                  />
                ) : (
                  <ProfileIcon />
                )}
              </div>
              <div>
                <p>
                  {`${comment.customer.firstName} ${comment.customer.lastName}`}
                </p>
              </div>
            </div>
            <div className={`relative ${hidden}`}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(() => !open);
                }}
                className="block h-8 w-6 bg-transparent"
              >
                <EllipseIcon />
              </button>
              {open && (
                <div className="absolute right-2 z-20 top-7">
                  <DeleteComment
                    refetch={refetch}
                    id={comment.id}
                    productId={productId}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            {comment.message.length > 100 ? (
              <>
                <div className="mx-1">
                  <p>
                    {clicked
                      ? comment.message
                      : `${comment.message.substring(0, 100)}...`}
                  </p>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setClicked(() => !clicked);
                    }}
                    aria-label="toggle comment"
                    className="bg-transparent underline text-sm"
                  >
                    {clicked ? "Less" : "More"}
                  </button>
                </div>
              </>
            ) : (
              <div>
                <p>{comment.message}</p>
              </div>
            )}
          </div>
          <div></div>
        </div>
        <div>
          <span className="text-sm font-semibold">
            {formatDate(comment.createdAt)}
          </span>
        </div>
      </div>
    </Transition>
  );
};

export default CommentItem;
