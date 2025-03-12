import { apiHost, apiProtocol } from "../../utils/generics";
import { CartItem } from "../../utils/types";
import DeleteCartItemButton from "./deletecartitembutton";
import { Link } from "react-router-dom";
import CartItemQuantity from "./cartitem-quantity";

interface Props {
  cartItem: CartItem;
  refetch: () => void;
}

export default function CartItemComponent({ cartItem, refetch }: Props) {
  return (
    <div className="cart-item flex md:flex-row flex-col md:justify-evenly justify-start md:items-start items-center gap-4 border border-black/25 pl-1 md:w-[450px] w-[250px] md:h-180 h-[336px] md:pb-0 py-2">
      <div>
        <img
          src={`${apiProtocol}://${apiHost}/${cartItem.product.images[0].url}`}
          alt={cartItem.product.name}
          className="h-32 w-32"
        />
      </div>
      <div className="md:w-auto w-20 h-32">
        <div>
          <Link
            to={`/products/${cartItem.productID}`}
            aria-label="Visit product"
            target="_blank"
            className="font-semibold underline"
          >
            {cartItem.product.name}
          </Link>
          <p>
            {cartItem.product.sellingPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <CartItemQuantity initial={cartItem.quantity} id={cartItem.id} />
        <div>
          <DeleteCartItemButton id={cartItem.id} refetch={refetch} />
        </div>
      </div>
    </div>
  );
}
