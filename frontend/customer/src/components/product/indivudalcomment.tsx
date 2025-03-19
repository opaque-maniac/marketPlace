import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import useFetchIndividualComment from "../../utils/hooks/fetchindividualcomment";
import CommentItem from "../comments/comment";

const FetchCommentReplies = lazy(() => import("../comments/replies"));

function Fallback() {
  return (
    <div className="h-100 w-full flex justify-center items-center">
      <div className="w-6 h-6">
        <Loader color="#000" />
      </div>
    </div>
  );
}

export default function IndividualComment() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const [id] = useState<string>(params.get("id") || "");

  const { comment, loading, error, refetch } = useFetchIndividualComment(
    id || "",
  );

  useEffect(() => {
    if (!id) {
      navigate("?open=true", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="min-h-40 flex justify-center items-center w-full">
        <p>Oops! Something went wrong</p>
        <button
          aria-label="refetch"
          onClick={(e) => {
            e.preventDefault();
            refetch();
          }}
          className="flex justify-center items-center bg-black text-white"
        >
          <span>Refetch</span>
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-40 flex justify-center items-center">
        <div className="w-6 h-6">
          <Loader color="#000" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {comment && (
        <>
          <CommentItem comment={comment} refetch={refetch} />
          {/* replies */}
          <div>
            {/* buttons */}
            <div className="py-[10px]">
              <h3>Replies:</h3>
            </div>
            <div>
              <Suspense fallback={<Fallback />}>
                <FetchCommentReplies commentID={comment.id} />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
