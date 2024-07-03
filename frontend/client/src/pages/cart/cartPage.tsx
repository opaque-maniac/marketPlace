import { useQuery } from "@tanstack/react-query";
import fetchCart from "./fetchCart";
import Loader from "../../components/loader";
import { CartResponseType } from "./types";
import ProductItem from "./productItem";

const CartPage = () => {
  const query = useQuery(["cart"], fetchCart);

  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const data = query.data as CartResponseType;

  return (
    <div className="lg:w-1200 md:mx-auto pt-8 lg:px-0 px-2 pb-4 min-h-full">
      {data.cart.cartItems && data.cart.cartItems.length > 0 ? (
        <div>
          <ul className="flex justify-center items-start flex-wrap lg:gap-8">
            {data.cart.cartItems.map((item) => (
              <li key={item.id}>
                <ProductItem color="white" product={item.product} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className="w-full flex justify-center items-center"
          style={{ height: "calc(100vh - 14rem)" }}
        >
          <h2 className="text-2xl">No items in favorites</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
