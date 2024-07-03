import { Comment } from "../types";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  return (
    <div className="w-full h-14 flex justify-start items-center pl-4">
      <div className="h-10">
        <img
          src={comment.customer.image.imageUrl}
          alt={`${comment.customer.firstName} ${comment.customer.lastName}`}
          className="h-full w-6 rounded-full object-contain"
        />
      </div>
      <div>
        <p>{comment.content}</p>
        <p className="text-xs text-gray-500">
          {new Date(comment.dateCreated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
