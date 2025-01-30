import { WishlistItem } from "../../utils/types";
import Loader from "../loader";
import { lazy, Suspense } from "react";

const WishlistItemComponent = lazy(() => import("./wishlistitem"));

const Fallback = () => {
  return (
    <div className="w-[270px] h-[350px] flex justify-center items-center">
      <div className="h-10 w-10">
        <Loader color="#fff" />
      </div>
    </div>
  );
};

interface Props {
  wishlistItems: WishlistItem[];
  color: string;
  refetch: () => void;
}

const Wishlist = ({ wishlistItems, color, refetch }: Props) => {
  return (
    <div className="h-full w-full">
      {wishlistItems.length > 0 ? (
        <ul className="flex h-full flex-wrap md:flex-row flex-col lg:gap-16 md:gap-36 gap-6 md:pl-10 lg:p-0 md:justify-start items-center justify-center">
          {wishlistItems.map((wishItem) => (
            <li key={wishItem.id}>
              <Suspense fallback={<Fallback />}>
                <WishlistItemComponent item={wishItem} refetch={refetch} />
              </Suspense>
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
