import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import Loader from "../../components/loader";
import CommentItem from "../../components/comment";
import { fetchProductComments } from "../../utils/queries/products";
import ArrowRight from "../../components/icons/arrowright";
import ArrowLeft from "../../components/icons/arrowleft";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import CommentForm from "../../components/commentform";
import useUserStore from "../../utils/store";

interface Props {
  id: string;
}

const CommentList = ({ id }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const query = useQuery({
    queryFn: fetchProductComments,
    queryKey: ["comments", id, page],
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
        } else {
          setError(true);
          navigate("/500", { replace: true });
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const refetchComments = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query.refetch();
  }, [query]);

  return (
    <div
      className={`h-full border rounded-lg w-full mx-auto ${query.data && query.data.data.length > 3 ? "overflow-y-scroll" : ""}`}
    >
      <div className="min-h-60">
        {query.isLoading && (
          <div className="h-64 w-full flex justify-center items-center">
            <div className="w-20 h-20 mx-auto">
              <Loader color="#000000" />
            </div>
          </div>
        )}
        {query.isSuccess && query.data ? (
          <>
            {query.data ? (
              <div>
                {query.data.data.length > 0 ? (
                  <ul className="flex flex-col justify-center items-center gap-4 py-2">
                    {query.data.data.map((comment) => (
                      <li key={comment.id} className="w-10/12">
                        <CommentItem
                          refetch={refetchComments}
                          comment={comment}
                          productId={id}
                        />
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
            disabled={page === 1}
            className="h-6 w-6 border border-black p-1 rounded-full"
          >
            <ArrowLeft />
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
            disabled={!query.data?.hasNext}
            className="h-6 w-6 border border-black p-1 rounded-full"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      {user && <CommentForm refetch={refetchComments} id={id} />}
    </div>
  );
};

export default CommentList;
