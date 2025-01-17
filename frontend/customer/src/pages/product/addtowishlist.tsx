import { MouseEventHandler, useContext } from "react";
import useUserStore from "../../utils/store";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addToWishlist } from "../../utils/mutations/wishlist/addtowishlist";
import { ErrorResponse } from "../../utils/types";
import errorHandler from "../../utils/errorHandler";
import Loader from "../../components/loader";

interface Props {
  id: string;
}

const AddToWishlist = ({ id }: Props) => {
  const user = useUserStore((state) => state.user);
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      navigate("/wishlist");
    },
    onError: (error) => {
      try {
        const errorObj = JSON.parse(error.message) as ErrorResponse;
        const [show, url] = errorHandler(errorObj.errorCode);

        if (show) {
          setErr(errorObj.message);
        } else {
          if (url) {
            if (url === "/500") {
              setError(true);
            }
            navigate(url, { replace: true });
          } else {
            setError(true);
            navigate("/500", { replace: true });
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          setErr("Something unexpected happened");
        }
      }
    },
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutation.mutate({ productID: id });
  };

  return (
    <button
      disabled={!user}
      onClick={clickHandler}
      title={user ? "Add product to wishlist" : "Log in to take this action"}
      className="rounded h-10 w-40 bg-red-400 text-white"
    >
      {mutation.isPending ? (
        <div className="h-10 w-10 py-1 mx-auto">
          <Loader color="#ffffff" />
        </div>
      ) : (
        "Add To Wishlist"
      )}
    </button>
  );
};

export default AddToWishlist;
