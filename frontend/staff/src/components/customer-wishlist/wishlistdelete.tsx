import { useMutation } from "@tanstack/react-query";
import { MouseEventHandler, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import BinIcon from "../icons/bin";
import { deleteWishlistitem } from "../../utils/mutations/customers/deletewishlistitem";
import Loader from "../loader";

interface Props {
  id: string;
  refetch: () => void;
}

const WishlistDelete = ({ id, refetch }: Props) => {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { isIdle, mutate } = useMutation({
    mutationFn: deleteWishlistitem,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const clickHanlder: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate(id);
  };

  return (
    <div className="h-10 w-full bg-black">
      <button
        title="Delete wishlist item"
        aria-label="Delete wishlist item"
        disabled={!isIdle}
        onClick={clickHanlder}
        className="h-10 w-full flex justify-center gap-[5px] items-center text-white"
      >
        <div className="h-8 w-8 text-white">
          {isIdle ? <BinIcon /> : <Loader color="#fff" />}
        </div>
        <span>Add To Cart</span>
      </button>
    </div>
  );
};

export default WishlistDelete;
