import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import Loader from "../../components/loader";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import CommentItem from "../../components/comments/comment";
import { fetchProductComments } from "../../utils/queries/products/fetchproductcomments";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  id: string;
}

const CommentList = ({ id }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const query = useQuery({
    queryFn: fetchProductComments,
    queryKey: ["comments", page, 5, id],
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const refetch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query.refetch();
  }, [query]);

  const comments = query.data?.comments || [];

  return (
    <div
      className={`h-72 border rounded-lg md:w-11/12 w-full md:mx-0 mx-auto ${query.data && query.data.comments.length > 3 ? "overflow-y-scroll" : ""}`}
    >
      <div className="h-60">
        {query.isLoading && (
          <div className="h-64 w-full flex justify-center items-center">
            <div className="w-8 h-6 mx-auto">
              <Loader color="#000000" />
            </div>
          </div>
        )}
        {query.isSuccess && query.data ? (
          <div className="h-[235px] overflow-y-scroll comment-scroll scroll-wite">
            {comments.length > 0 ? (
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id} className="mb-2">
                    <CommentItem comment={comment} refetch={refetch} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center h-[230px]">
                <h3>No Comments For This Product</h3>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="h-12 flex justify-center items-center gap-6">
        <div>
          <button
            aria-label="Previous Page"
            className="underline"
            onClick={(e) => {
              e.preventDefault();
              if (page === 1) {
                return;
              }
              setPage(() => page - 1);
            }}
          >
            Prev
          </button>
        </div>
        <div>{page}</div>
        <div>
          <button
            aria-label="Next Page"
            className="underline"
            onClick={(e) => {
              e.preventDefault();
              if (!query.data?.hasNext) {
                return;
              }
              setPage(() => page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
