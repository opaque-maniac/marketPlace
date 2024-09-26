import WishlistItemComponent from "../utils/mutations/wishlistitem";
import { WishlistItem } from "../utils/types";

interface Props {
  wishlistItems: WishlistItem[];
  color: string;
  overflow: boolean;
  full: boolean;
  center?: boolean;
  refetch: () => void;
}

const Wishlist = ({
  wishlistItems,
  color,
  overflow,
  full,
  center,
  refetch,
}: Props) => {
  const justify =
    overflow === true ? "justify-start" : "justify-center lg:gap-10 md:gap-20";
  const scrollColor = color == "white" ? "scroll-black" : "scroll-white";
  const overflowStyle = overflow
    ? "overflow-x-auto scroll-mod overflow-y-hidden pb-2"
    : "flex-wrap md:flex-row flex-col";
  const align = center ? "items-center" : "md:items-start items-center";

  return (
    <div className="h-full w-full">
      {wishlistItems.length > 0 ? (
        <ul
          className={`flex h-full ${justify} ${align} gap-4 ${scrollColor} ${overflowStyle}`}
        >
          {wishlistItems.map((wishItem) => (
            <li key={wishItem.id}>
              <WishlistItemComponent item={wishItem} refetch={refetch} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="flex justify-center h-full w-full items-center"
          style={{ minHeight: full ? "calc(100vh - 1.4rem )" : "auto" }}
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
