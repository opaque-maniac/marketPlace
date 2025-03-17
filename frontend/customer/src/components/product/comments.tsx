import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import Loader from "../../components/loader";
import CommentItem from "../../components/comments/comment";
import { fetchProductComments } from "../../utils/queries/products/fetchproductcomments";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../utils/store";
import { errorHandler } from "../../utils/errorHandler";
import NewComment from "../../components/comments/commentform";
import MoreCommentsButton from "./morecomments";

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
                <div className="xl:w-746 md:w-[500px] w-[350px] h-[30px] mx-auto flex justify-between items-start">
                  <h3>Comments</h3>
                  {query.data.data.length > 0 && (
                    <MoreCommentsButton productID={id} />
                  )}
                </div>
                {query.data.data.length > 0 ? (
                  <ul className="flex flex-col items-center gap-2 md:min-h-[316px] min-h-[382px]">
                    {query.data.data.map((comment) => (
                      <li key={comment.id}>
                        <CommentItem
                          refetch={refetchComments}
                          comment={comment}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex justify-center items-center md:h-[316px] h-[382px]">
                    <h3>No Comments For This Product</h3>
                  </div>
                )}
              </div>
            ) : null}
          </>
        ) : null}
        {user && (
          <>
            <h3 className="text-center">New Comment</h3>
            <div className="md:w-auto w-full">
              <NewComment
                buttonText="Send"
                productID={id}
                refetch={refetchComments}
              />
            </div>
          </>
        )}
      </div>
      {user && null}
    </div>
  );
};

export default CommentList;
