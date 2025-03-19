import { lazy, Suspense, useState } from "react";
import { Comment } from "../../utils/types";
import useUserStore from "../../utils/store";
import { timeAgo } from "../../utils/date";
import NewComment from "./commentform";
import PencilIcon from "../icons/pencil";
import { apiHost, apiProtocol } from "../../utils/generics";
import ReplyIcon from "../icons/reply";
import DeleteCommentButton from "./deletecomment";
import Loader from "../loader";
import { useNavigate } from "react-router-dom";

const FetchCommentReplies = lazy(() => import("./replies"));

interface Props {
  comment: Comment;
  isReply?: boolean;
  isModal?: boolean;
  refetch: () => void;
}

const Fallback = () => {
  return (
    <div className="xl:w-746 md:w-[500px] w-[350px] min-h-[100px] flex justify-center items-center">
      <div className="w-6 h-6">
        <Loader color="#000" />
      </div>
    </div>
  );
};

const CommentItem = ({
  comment,
  refetch,
  isReply = false,
  isModal = false,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <div
      style={{ backgroundColor: "#e6f7ff" }}
      className={`${isReply ? "xl:w-[700px]" : "xl:w-746"} md:w-[500px] w-[350px] min-h-[100px] rounded-md p-2 relative`}
    >
      <div>
        <div className="flex justify-start items-center gap-[14px] mb-[16px]">
          <img
            src={
              comment.customer.image
                ? `${apiProtocol}://${apiHost}/${comment.customer.image.url}`
                : "/images/profile.svg"
            }
            alt="user avatar"
            className="w-[32px] h-[32px] rounded-full overflow-hidden"
          />
          <p className="h-[19px] w-[77px] overflow-hidden text-sm">
            {comment.customer.firstName} {comment.customer.lastName}
          </p>
          {user === comment.customerID && (
            <p
              style={{
                borderRadius: "4px",
              }}
              className="tag text-xs w-[37px] h-[18px] bg-blue-500 text-white font-semibold text-center"
            >
              you
            </p>
          )}
          <p className="date">{timeAgo(comment.createdAt)}</p>
        </div>
        <div className="editing">
          {!isEditing && <p className="comment-content">{comment.message}</p>}
          {isEditing && (
            <div className="md:pb-0 pb-2">
              <NewComment
                initialText={comment.message}
                initialID={comment.id}
                isEdit={true}
                buttonText="Update"
                refetch={() => {
                  refetch();
                  setIsEditing(false);
                }}
              />
            </div>
          )}
        </div>
        <div className="md:block flex justify-between items-center">
          <div className="md:absolute md:top-2 top-[38px] right-2 md:pt-0 pt-[5px]">
            {user === comment.customerID ? (
              <div className="flex gap-2">
                <DeleteCommentButton commentID={comment.id} refetch={refetch} />
                <button
                  className="flex justify-center items-center md:w-[104px] w-[40px] h-[34px] bg-white rounded-lg gap-[5px]"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing((prev) => !prev);
                  }}
                >
                  <div className="w-[12px] h-[18px]">
                    <PencilIcon />
                  </div>
                  <span className="md:inline hidden">Edit</span>
                </button>
              </div>
            ) : (
              <>
                {user && (
                  <button
                    className="flex justify-center items-center w-[104px] h-[34px] bg-white rounded-lg gap-[5px]"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsReplying((prev) => !prev);
                    }}
                  >
                    <div className="w-[12px] h-[18px]">
                      <ReplyIcon />
                    </div>
                    Reply
                  </button>
                )}
              </>
            )}
          </div>

          <div>
            {comment.hasReplies && (
              <button
                aria-label={isRepliesOpen ? "Hide replies" : "Show replies"}
                className="text-xs xl:no-underline underline xl:hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  if (isModal || isReply) {
                    navigate(`?open=true&id=${comment.id}`);
                  } else {
                    setIsRepliesOpen((prev) => !prev);
                  }
                }}
              >
                {isRepliesOpen ? "Close" : "Replies"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        {isReplying && (
          <div className="md:py-0 py-2">
            <NewComment
              placeholder={`Replying to @${comment.customer.firstName}`}
              isReplying={true}
              initialID={comment.id}
              buttonText="Reply"
              refetch={() => {
                refetch();
                setIsReplying(false);
              }}
            />
          </div>
        )}
        {isRepliesOpen && (
          <Suspense fallback={<Fallback />}>
            <FetchCommentReplies commentID={comment.id} />{" "}
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
