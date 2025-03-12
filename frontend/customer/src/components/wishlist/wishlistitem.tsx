import RemoveWishlistItem from "../../components/wishlist/removewishlititem";
import { WishlistItem } from "../../utils/types";
import { Link } from "react-router-dom";
import WishlistAddToCart from "./wishlistaddtocart";
import { calculateDiscount } from "../../utils/price";
import { apiHost, apiProtocol } from "../../utils/generics";

interface Props {
  item: WishlistItem;
  refetch: () => void;
}

const WishlistItemComponent = ({ item, refetch }: Props) => {
  return (
    <div className="h-350 wishes">
      <Link to={`/products/${item.product.id}`}>
        <div className="h-[250px] w-[270px] flex items-end justify-center pb-4">
          <img
            src={`${apiProtocol}://${apiHost}/${item.product.images[0].url}`}
            alt={item.product.name}
            className="h-[220px] w-[230px]"
            loading="lazy"
          />
        </div>
        <div className="absolute right-1 top-0 z-0">
          <RemoveWishlistItem id={item.id} refetch={refetch} />
        </div>
        <div className="absolute top-0 left-4 bg-red-600 h-10 w-10 rounded-tl-md rounded-br-md flex justify-center items-center">
          <span className="text-white font-semibold">
            {calculateDiscount(
              item.product.buyingPrice,
              item.product.sellingPrice,
            )}
            %
          </span>
        </div>
        <div>
          <p className={`text-black text-xl text-center`}>
            {item.product.name}
          </p>
        </div>
        <div className="flex justify-around items-center py-1">
          <span className="text-red-400">
            {item.product.sellingPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-gray-400 line-through">
            {item.product.buyingPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </Link>
      <WishlistAddToCart id={item.product.id} />
    </div>
  );
};

export default WishlistItemComponent;
