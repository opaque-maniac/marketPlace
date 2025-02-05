import { lazy, Suspense } from "react";
import { CartItem } from "../../utils/types";
import Loader from "../loader";
import CartQuantity from "./cartQuantity";
import OrderCart from "./ordercart";
import OrderCartItem from "./ordercartitem";

const RemoveFromCart = lazy(() => import("./removefromcart"));

const Fallback = ({ background }: { background: string }) => {
  return (
    <div>
      <button
        disabled
        aria-label="Loading"
        className={`block h-10 w-20 bg-${background}-500 text-white rounded-lg`}
      >
        <div className="h-10 w-10 p-1 mx-auto">
          <Loader color="#fff" />
        </div>
      </button>
    </div>
  );
};

interface Props {
  cartItem: CartItem;
  refetch: () => void;
}

const CartItemComponent = ({ cartItem, refetch }: Props) => {
  return (
    <div className="cart-item flex md:flex-row flex-col md:justify-evenly justify-center items-center gap-4 border border-black/25 pl-1 md:w-500 w-[250px] md:h-180 h-auto md:pb-0 py-2">
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
        <Suspense fallback={<Fallback background="red" />}>
          <RemoveFromCart refetch={refetch} id={cartItem.id} />
        </Suspense>
        <Suspense fallback={<Fallback background="green" />}>
          <OrderCartItem refetch={refetch} id={cartItem.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default CartItemComponent;
