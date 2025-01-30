import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import Loader from "../../components/loader";
import CommentItem from "../../components/comments/comment";
import { fetchProductComments } from "../../utils/queries/products/fetchproductcomments";
import ArrowRight from "../../components/icons/arrowright";
import ArrowLeft from "../../components/icons/arrowleft";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import CommentForm from "../../components/comments/commentform";
import useUserStore from "../../utils/store";
import { errorHandler } from "../../utils/errorHandler";

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
    errorHandler(query.error, navigate, setErr, setError);
  }

  const refetchComments = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query.refetch();
  }, [query]);

  return (
    <div
      className={"h-full border rounded-lg xl:w-7/12 md:w-10/12 w-full mx-auto"}
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
                  <ul className="flex flex-col justify-evenly items-center gap-4 py-2 md:h-96 h-auto overflow-y-scroll border-b border-black/25 pb-2 mx-auto no-scrollbar rounded-b-md">
                    {query.data.data.map((comment) => (
                      <li key={comment.id} className="md:w-10/12 w-11/12">
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
