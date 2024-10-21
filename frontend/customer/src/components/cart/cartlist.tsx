import { CartItem } from "../../utils/types";
import CartItemComponent from "./cartItem";

interface Props {
  cartItems: CartItem[];
  color: string;
  refetch: () => void;
}

const CartList = ({ cartItems, color, refetch }: Props) => {
  return (
    <div className="h-full w-full">
      {cartItems.length > 0 ? (
        <ul
          className={`flex h-full flex-wrap md:flex-row flex-col gap-10 md:pl-10 lg:p-0 justify-evenly items-center`}
        >
          {cartItems.map((item) => (
            <li key={item.id}>
              <CartItemComponent cartItem={item} refetch={refetch} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="flex justify-center h-full w-full items-center"
          style={{ minHeight: "calc(100vh - 2.4rem )" }}
        >
          <p
            className={`text-2xl font-semibold text-wrap text-center text-${color}`}
          >
            No items in your cart
          </p>
        </div>
      )}
    </div>
  );
};

export default CartList;
