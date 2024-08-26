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
    <div
      className={`h-72 border rounded-lg md:w-8/12 w-11/12 mx-auto ${query.data && query.data.data.length > 3 ? "overflow-y-scroll" : ""}`}
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
            {query.data ? (
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