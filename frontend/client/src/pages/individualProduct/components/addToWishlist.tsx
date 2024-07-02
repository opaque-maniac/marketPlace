import { useMutation } from "@tanstack/react-query";
import HeartIcon from "../../../components/icons/Heart";
import { useLoggedInStore } from "../../../utils/store";
import sendAddToWishlist from "./sendAddToWishlist";
import { MouseEventHandler } from "react";
import Loader from "../../../components/loader";

interface Props {
  id: string;
}

const AddToWishlistButton = ({ id }: Props) => {
  const user = useLoggedInStore((state) => state.user);

  const mutation = useMutation({
    mutationFn: sendAddToWishlist,
    onSuccess: () => {},
    onError: () => {},
  });

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (user) {
      mutation.mutate(id);
    }
  };

  return (
    <button
      onClick={clickHandler}
      disabled={!user || mutation.isLoading}
      className="flex justify-start items-center p-1 bg-green-500 text-white rounded gap-1"
    >
      <div className="w-8 h-7">
        {mutation.isLoading && <Loader />}
        {!mutation.isLoading && <HeartIcon />}
      </div>
      <p>Add To Wishlist</p>
    </button>
  );
};

export default AddToWishlistButton;
