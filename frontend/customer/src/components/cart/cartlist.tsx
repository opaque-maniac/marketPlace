import { lazy, Suspense } from "react";
import { CartItem } from "../../utils/types";
import Loader from "../loader";

const CartItemComponent = lazy(() => import("./cartItem"));

const Fallback = () => {
  return (
    <div className="w-[250px] md:h-180 h-[400px] flex justify-center items-center">
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

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
            className="grid xl:grid-cols-2 grid-cols-1"
        >
          {cartItems.map((item) => (
              <li key={item.id} className="mx-auto md:mb-8 mb-6">
              <Suspense fallback={<Fallback />}>
                <CartItemComponent cartItem={item} refetch={refetch} />
              </Suspense>
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
