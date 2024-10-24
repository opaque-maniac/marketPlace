import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import { fetchProductComments } from "../../utils/queries/products";
import Loader from "../../components/loader";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import CommentItem from "../../components/comments/comment";

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
    const data = query.error;
    try {
      const error = JSON.parse(data.message) as ErrorResponse;
      const [show, url] = errorHandler(error.errorCode);
      if (show) {
        setErr(error.message);
      } else {
        if (url) {
          if (url === "/500") {
            setError(true);
          }
          navigate(url);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const refetch = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query.refetch();
  }, [query]);

  return (
    <div
      className={`h-72 border rounded-lg md:w-8/12 w-11/12 mx-auto ${query.data && query.data.comments.length > 3 ? "overflow-y-scroll" : ""}`}
    >
      <div className="h-60">
        {query.isLoading && (
          <div className="h-64 w-full flex justify-center items-center">
            <div className="w-20 h-20 mx-auto">
              <Loader color="#000000" />
            </div>
          </div>
        )}
        {query.isSuccess && query.data ? (
          <>
            {query.data && query.data.comments.length > 0 ? (
              <div>
                {query.data.comments.length > 0 ? (
                  <ul>
                    {query.data.comments.map((comment) => (
                      <li key={comment.id} className="mb-2">
                        <CommentItem comment={comment} refetch={refetch} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex justify-center items-center h-60">
                    <h3>No Comments For This Product</h3>
                  </div>
                )}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
      <div className="h-12 flex justify-center items-center gap-6">
        <div>
          <button
            aria-label="Previous Page"
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
