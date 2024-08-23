import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProductComments } from "../../utils/queries/products";
import Loader from "../../components/loader";
import CommentItem from "../../components/comment";

interface Props {
  id: string;
}

const CommentList = ({ id }: Props) => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery({
    queryFn: fetchProductComments,
    queryKey: ["comments", id, page],
  });

  return (
    <div className="h-80 overflow-y-scroll">
      <div className="h-full">
        {query.isLoading && <Loader color="#000000" />}
        {query.isSuccess && query.data ? (
          <>
            {query.data.comments.length > 0 ? (
              <ul>
                {query.data.comments.map((comment) => (
                  <li key={comment.id}>
                    <CommentItem comment={comment} />
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <h3>No Comments For This Product</h3>
              </div>
            )}
          </>
        ) : null}
      </div>
      <div>
        <div>
          <button
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
