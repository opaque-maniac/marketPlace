import Loader from "../loader";
import CommentItem from "./comment";
import useCommentReplies from "../../utils/hooks/fetchcommentreplies";

interface Props {
  commentID: string;
}

export default function FetchCommentReplies({ commentID }: Props) {
  const { comments, page, loading, error, hasMore, setPage, refetch } =
    useCommentReplies(commentID);

  return (
    <div className="xl:w-746 md:w-[500px] w-[350px] min-h-[100px]">
      {(loading && page === 1) || (error && page === 1) ? null : (
        <div className="xl:w-746 md:w-[500px] w-[350px] min-h-[100px]">
          {comments.length === 0 ? (
            <div className="xl:w-746 md:w-[500px] w-[350px] min-h-[100px] flex justify-center items-center">
              <p>No replies found</p>
            </div>
          ) : (
            <div className="w-full h-full">
              <ul className="border-l border-black">
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <CommentItem
                      comment={comment}
                      isReply={true}
                      refetch={refetch}
                    />
                  </li>
                ))}
              </ul>
              {hasMore && (
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                    aria-label="Fetch more replies"
                    className="xl:no-underline xl:hover:underline underline text-xs"
                  >
                    More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="xl:w-746 md:w-[500px] w-[350px] min-h-[100px] flex justify-center items-center">
          <div className="w-6 h-6">
            <Loader color="#000" />
          </div>
        </div>
      ) : error ? (
        <div className="xl:w-746 md:w-[500px] w-[350px] min-h-[100px] flex justify-center items-center">
          <p>Oops! Something went wrong</p>
        </div>
      ) : null}
    </div>
  );
}
