import { WishlistItem } from "../../utils/types";
import { Link } from "react-router-dom";
import { apiHost, apiProtocol } from "../../utils/generics";
import DeleteWishlistItemButton from "./wishlistdelete";

interface Props {
  item: WishlistItem;
  refetch: () => void;
}

export default function WishlistItemComponent({ item, refetch }: Props) {
  return (
    <div className="h-[375px] w-[260px] wishes border-r border-t border-l">
      <Link to={`/products/${item.product.id}`} target="_blank">
        <div className="h-[250px] w-[270px] flex items-end justify-center pb-4">
          <img
            src={`${apiProtocol}://${apiHost}/${item.product.images[0].url}`}
            alt={item.product.name}
            className="h-[220px] w-[230px]"
            loading="lazy"
          />
        </div>
        <div>
          <p className={`text-black text-xl text-center`}>
            {item.product.name}
          </p>
          <p className="text-black text-center">{item.product.category}</p>
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
      <div className="h-10 w-full bg-black">
        <DeleteWishlistItemButton id={item.id} refetch={refetch} />
      </div>
    </div>
  );
}
