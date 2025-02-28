import { CartItem } from "../../utils/types";
import BinIcon from "../icons/bin";

interface Props {
  cartItem: CartItem;
  refetch: () => void;
}

const CartItemComponent = ({ cartItem, refetch }: Props) => {
  return (
    <div className="cart-item flex md:flex-row flex-col md:justify-evenly justify-center items-center gap-4 border border-black/25 pl-1 md:w-[450px] w-[250px] md:h-180 h-auto md:pb-0 py-2">
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
        <div>
          <button className="flex justify-start items-center gap-[2px] w-20 h-10 bg-red-500 text-white px-2">
            <div className="h-8 w-8">
              <BinIcon />
            </div>
            <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
