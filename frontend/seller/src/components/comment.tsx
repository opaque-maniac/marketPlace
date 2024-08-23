import { Comment } from "../utils/types";
import Transition from "./transition";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  return (
    <Transition>
      <div>
        <p>{comment.message}</p>
        <div>
          {/*<span>{comment.user.username}</span> */}
          <span>{comment.createdAt}</span>
        </div>
      </div>
    </Transition>
  );
};

export default CommentItem;
