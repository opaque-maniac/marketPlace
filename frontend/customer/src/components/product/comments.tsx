import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import Loader from "../../components/loader";
import CommentItem from "../../components/comments/comment";
import { fetchProductComments } from "../../utils/queries/products/fetchproductcomments";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import CommentForm from "../../components/comments/commentform";
import useUserStore from "../../utils/store";
import { errorHandler } from "../../utils/errorHandler";
import NewComment from "../../components/comments/commentform";

interface Props {
  id: string;
}

const CommentList = ({ id }: Props) => {
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const query = useQuery({
    queryFn: fetchProductComments,
    queryKey: ["comments", id, 1, 3],
  });

  if (query.isError) {
    errorHandler(query.error, navigate, setErr, setError);
  }

  const refetchComments = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    query.refetch();
  }, [query]);

  return (
    <div>
      <div className="min-h-60">
        {query.isLoading && (
          <div className="h-64 w-full flex justify-center items-center">
            <div className="w-8 h-8 mx-auto">
              <Loader color="#000000" />
            </div>
          </div>
        )}
        {query.isSuccess && query.data ? (
          <>
            {query.data ? (
              <div>
                {query.data.data.length > 0 ? (
                  <ul className="flex flex-col items-center gap-2 border border-red-500">
                    {query.data.data.map((comment) => (
                      <li key={comment.id}>
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
        <div>
          <NewComment buttonText="Send comment" />
        </div>
      </div>
      {user && null}
    </div>
  );
};

export default CommentList;
