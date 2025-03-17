import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchIndividualComment } from "../../utils/queries/comments/fetchindivudalcomment";
import Loader from "../loader";

const Fallback = () => {
  return (
    <div className="min-h-100 w-full flex justify-center items-center">
      <div className="w-6 h-6">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function IndividualComment() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.pathname);
  const open = params.get("open") === "true" ? true : false;
  const id = params.get("commentID");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryFn: fetchIndividualComment,
    queryKey: ["comment", id || ""],
  });

  return (
    <div>
      <div>
        {isSuccess && <>{data && <div></div>}</>}
        {isError && (
          <div className="min-h-40 flex justify-center items-center">
            <p>Oops! Something went wrong</p>
          </div>
        )}
        {isLoading && (
          <div className="min-h-40 flex justify-center items-center">
            <div className="w-6 h-6">
              <Loader color="#000" />
            </div>
          </div>
        )}
      </div>

      {/* replies */}
      <div>
        {/* buttons */}
        <div></div>
      </div>
    </div>
  );
}
