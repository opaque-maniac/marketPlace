import ProfileIcon from "../../../components/icons/profileIcon";
import { Comment } from "../types";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  return (
    <div className="w-full h-auto flex justify-start items-center gap-4 pl-4 border-b border-black py-2 rounded-b">
      <div className="h-14 rounded-full border border-black">
        {comment.customer.image ? (
          <img
            src={comment.customer.image.imageUrl}
            alt={`${comment.customer.firstName} ${comment.customer.lastName}`}
            className="h-full w-6 rounded-full object-contain"
          />
        ) : (
          <>
            <ProfileIcon />
          </>
        )}
      </div>
      <div>
        <p style={{ fontSize: "0.8rem" }}>{comment.content}</p>
        <p className="text-xs text-gray-500">
          {`${comment.customer.firstName} ${comment.customer.lastName}`}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(comment.dateCreated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
