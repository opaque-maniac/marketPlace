import { CartItem } from "../../utils/types";
import CartQuantity from "./cartQuantity";
import RemoveFromCart from "./removefromcart";

interface Props {
  cartItem: CartItem;
  refetch: () => void;
}

const CartItemComponent = ({ cartItem, refetch }: Props) => {
  return (
    <div className="flex md:flex-row flex-col md:justify-evenly justify-center items-center gap-4 border border-black/25 pl-1 md:w-500 w-[250px] md:h-180 h-auto md:pb-0 py-2">
      <div>
        <img
          src={`http://localhost:3020/${cartItem.product.images[0].url}`}
          alt={cartItem.product.name}
          className="h-32 w-32"
        />
      </div>
      <div className="md:w-auto w-20">
        <h2 className="font-semibold">{cartItem.product.name}</h2>
        <p>
          {cartItem.product.sellingPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          })}
        </p>
        <p>Quantity: {cartItem.quantity}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <CartQuantity
          quantity={cartItem.quantity}
          id={cartItem.product.id}
          inventory={cartItem.product.inventory}
        />
        <RemoveFromCart refetch={refetch} id={cartItem.id} />
      </div>
    </div>
  );
};

export default CartItemComponent;
