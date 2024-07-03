import { useQuery } from "@tanstack/react-query";
import fetchComments from "./fetchComments";
import Loader from "../../../components/loader";
import { CommentRes } from "../types";
import CommentForm from "./commentForm";
import CommentItem from "./commentItem";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ErrorContext from "../../../utils/errorContext";

interface Props {
  id: string;
}

const ProductComment = ({ id }: Props) => {
  const query = useQuery(["comments", { id, page: 1 }], fetchComments);
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);

  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (query.isError) {
    setError(true);
    navigate("/error/500", { replace: true });
  }

  const data = query.data as CommentRes;

  if (data.message === "Product not found") {
    navigate("/error/404", { replace: true });
  }

  return (
    <section className="lg:flex justify-between px-2 items-center border-b border-black pb-4">
      <div className="lg:w-6/12 w-11/12 h-350 mx-auto lg:mx-0 border border-black border-collapse lg:mb-0 mb-4">
        {query.isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="h-full w-full">
            {data.comments && data.comments.length > 0 ? (
              <ul
                className="overflow-y-scroll w-full"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarGutter: "inherit",
                  scrollbarColor: "#000 #ffffff",
                }}
              >
                {data.comments.map((comment) => (
                  <li key={comment.id}>
                    <CommentItem comment={comment} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center flex justify-center items-center h-full w-full">
                <h1 className="text-2xl">No comments yet</h1>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="lg:w-5/12 w-11/12 mx-auto lg:mx-0 lg:h-350 md:h-313">
        <h3 className="text-xl text-center mb-2 font-semibold">
          Comment About The Product
        </h3>
        <p className="text-center w-7/12 mx-auto mb-8">{`You're opinion is important. Enter your comment and share your opinion with other members of our user base.`}</p>
        <CommentForm id={id} />
      </div>
    </section>
  );
};

export default ProductComment;
