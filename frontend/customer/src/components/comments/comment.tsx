import { useState } from "react";
import { Comment } from "../../utils/types";
import useUserStore from "../../utils/store";
import { formatDate, timeAgo } from "../../utils/date";
import NewComment from "./commentform";
import BinIcon from "../icons/bin";
import PencilIcon from "../icons/pencil";

interface Props {
  comment: Comment;
  productId: string;
  refetch: () => void;
}

const CommentItem = ({ comment, productId, refetch }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);

  return (
    <div
      style={{ backgroundColor: "#e6f7ff" }}
      className="xl:w-746 min-h-[100px] rounded-md p-2 relative"
    >
      <div>
        <div className="flex justify-start items-center gap-[14px] mb-[16px]">
          <img
            src={comment.customer.image ? `` : "/images/profile.svg"}
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
            <NewComment
              initialText={comment.message}
              isEdit
              buttonText="update"
            />
          )}
        </div>
        <div className="md:block flex justify-between items-center">
          <div className="w-[120px] border border-green-500 h-[34px]"></div>
          <div className="md:absolute md:top-2 top-[38px] right-0">
            {user === comment.customerID ? (
              <div className="flex">
                <button
                  className="flex justify-center items-center w-[104px] h-[34px] bg-white rounded-lg gap-[5px]"
                  onClick={() => {}}
                >
                  <div className="w-[20px] h-[30px] text-red-500 gap-1">
                    <BinIcon />
                  </div>
                  <span className="text-red-500 font-semibold text-lg">
                    Delete
                  </span>
                </button>
                <button
                  className="flex justify-center items-center w-[104px] h-[34px]"
                  onClick={() => {}}
                >
                  <div className="w-[12px] h-[18px]">
                    <PencilIcon />
                  </div>
                  Edit
                </button>
              </div>
            ) : (
              <button className="reply-btn" onClick={() => {}}>
                <img className="reply-icon" src={""} alt="reply icon" />
                Reply
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        {isReplying && (
          <div>
            <NewComment
              placeholder={`Replying to @${props.user.username}`}
              buttonText="reply"
            />
          </div>
        )}
        {/*
      //{props.replies && (
        //<div className="replies-container">
          //{backendReplies.map((reply) => (
            //<div className="reply">
              //<Reply
                //key={reply.id}
                //currentUser={props.currentUser}
                //activeComment={props.activeComment}
                //setActiveComment={props.setActiveComment}
                //addReply={addReply}
                //deleteReply={deleteReply}
                //updateReply={updateReply}
                //{...reply}
              ///>
            //</div>
          //))}
                //*/}
      </div>
      {/*
      {showDeleteModal && (
        <div className="delete-modal-container">
          <div className="delete-modal">
            <h2 className="delete-modal_title">Delete comment</h2>
            <p className="delete-modal_content">
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div className="delete-modal_btns">
              <button
                className="delete-modal_btn no"
                onClick={() => {
                  setShowDeleteModal(false);
                }}
              >
                No, cancel
              </button>
              <button
                className="delete-modal_btn yes"
                onClick={() => {
                  props.deleteComment(props.id);
                }}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
  */}
    </div>
  );
};

export default CommentItem;
