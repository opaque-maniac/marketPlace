import { useQuery } from "@tanstack/react-query";
import { MouseEventHandler, useContext, useState } from "react";
import { fetchProductComments } from "../../utils/queries/products/fetchproductcomments";
import Loader from "../../components/loader";
import CommentItem from "../../components/comment";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../utils/errorHandler";
import ArrowLeft from "../../components/icons/arrowleft";
import ArrowRight from "../../components/icons/arrowright";

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
    queryKey: ["comments", id, page],
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const rightHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!query.data?.hasNext) {
      return;
    }
    setPage(() => page + 1);
  };

  const leftHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (page === 1) {
      return;
    }
    setPage(() => page - 1);
  };

  return (
    <div
      className={`h-72 border rounded-lg xl:w-6/12 md:w-7/12 w-10/12 mx-auto ${query.data && query.data.data.length > 3 ? "overflow-y-scroll" : ""}`}
    >
      <div className="h-60">
        {query.isLoading && (
          <div className="h-64 w-full flex justify-center items-center">
            <div className="w-10 h-10 mx-auto">
              <Loader color="#000000" />
            </div>
          </div>
        )}
        {query.isSuccess && query.data ? (
          <>
            {query.data && query.data.data.length > 0 ? (
              <div>
                {query.data.data.length > 0 ? (
                  <ul>
                    {query.data.data.map((comment) => (
                      <li key={comment.id}>
                        <CommentItem comment={comment} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex justify-center items-center h-60 w-full">
                    <h3>No Comments For This Product</h3>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-60 flex justify-center items-center">
                <p>No Comments for product</p>
              </div>
            )}
          </>
        ) : null}
      </div>
      <div className="h-12 flex justify-center items-center gap-6">
        <div>
          <button
            aria-label="Previous Page"
            disabled={page <= 1 || query.isLoading}
            className="border border-black/50 block w-6 h-6 rounded-full p-1"
            onClick={leftHandler}
          >
            <ArrowLeft />
          </button>
        </div>
        <div>{page}</div>
        <div>
          <button
            aria-label="Next Page"
            disabled={!query.data?.hasNext || query.isLoading}
            className="border border-black/50 block w-6 h-6 rounded-full p-1"
            onClick={rightHandler}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
