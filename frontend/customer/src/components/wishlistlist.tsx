import WishlistItemComponent from "../utils/mutations/wishlistitem";
import { WishlistItem } from "../utils/types";

interface Props {
  wishlistItems: WishlistItem[];
  color: string;
  refetch: () => void;
}

const Wishlist = ({ wishlistItems, color, refetch }: Props) => {
  return (
    <div className="h-full w-full">
      {wishlistItems.length > 0 ? (
        <ul className="flex h-full flex-wrap md:flex-row flex-col lg:gap-16 md:justify-start items-center justify-center">
          {wishlistItems.map((wishItem) => (
            <li key={wishItem.id}>
              <WishlistItemComponent item={wishItem} refetch={refetch} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="flex justify-center h-full w-full items-center"
          style={{ minHeight: "calc(100vh - 1.4rem )" }}
        >
          <p
            className={`text-2xl font-semibold text-wrap text-center text-${color}`}
          >
            No products in your wishlist
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
