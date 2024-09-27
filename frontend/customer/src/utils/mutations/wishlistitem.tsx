import { useState } from "react";
import EllipseIcon from "../../components/icons/ellipse";
import ProductItem from "../../components/product";
import RemoveWishlistItem from "../../components/removewishlititem";
import { WishlistItem } from "../types";

interface Props {
  item: WishlistItem;
  refetch: () => void;
}

const WishlistItemComponent = ({ item, refetch }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className="relative">
      <div className="absolute z-10 left-4 top-4">
        <button
          aria-label="toggle remove button"
          onClick={(e) => {
            e.preventDefault();
            setClicked(() => !clicked);
          }}
          className="h-8 w-6 bg-white rounded-lg"
        >
          <EllipseIcon />
        </button>
        {clicked && <RemoveWishlistItem id={item.id} refetch={refetch} />}
      </div>
      <ProductItem product={item.product} color={"black"} />
    </div>
  );
};

export default WishlistItemComponent;
