interface Props {
  id: string;
}

const AddToWishlist = ({ id }: Props) => {
  return (
    <button className="rounded h-10 w-40 bg-red-400 text-white">
      Add To Wishlist
    </button>
  );
};

export default AddToWishlist;
