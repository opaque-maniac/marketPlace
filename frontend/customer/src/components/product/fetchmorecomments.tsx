import useMoreProductComments from "../../utils/hooks/fetchmorecomments";
import CommentItem from "../comments/comment";
import Loader from "../loader";
import NewComment from "../comments/commentform";

interface Props {
  productID: string;
}

export default function MoreComments({ productID }: Props) {
  const { loading, comments, page, error, hasMore, setPage, refetch } =
    useMoreProductComments(productID);

  const height = "xl:w-746 md:w-[500px] w-[350px]";

  return (
    <div className={height}>
      <div className="xl:h-[440px] md:h-[630px] h-[440px] overflow-scroll no-scrollbar">
        {loading && page === 1 ? null : (
          <div className={height}>
            {comments.length === 0 ? (
              <div className={`${height} flex justify-center items-center`}>
                <p>No replies found</p>
              </div>
            ) : (
              <div>
                <ul className="flex flex-col items-center gap-4 md:pb-0 pb-4">
                  {comments.map((comment) => (
                    <li key={comment.id}>
                      <CommentItem
                        comment={comment}
                        isReply={true}
                        isModal={true}
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
            <p>{error}</p>
          </div>
        ) : null}
      </div>
      <div className="xl:px-4 md:h-[120px] bottom-0 left-0 pb-2 pt-2 w-full bg-white pt-1">
        <NewComment buttonText="Send" productID={productID} refetch={refetch} />
      </div>
    </div>
  );
}
