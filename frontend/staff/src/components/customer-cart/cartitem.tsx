import { apiHost, apiProtocol } from "../../utils/generics";
import { CartItem } from "../../utils/types";
import { MouseEventHandler } from "react";
import DeleteCartItemButton from "./deletecartitembutton";

interface Props {
  cartItem: CartItem;
  refetch: () => void;
}

function ProductName({ name, id }: { name: string; id: string }) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    window.open(`${window.location.origin}/products/${id}`, "_blank");
  };

  return (
    <button
      aria-label="Visit product"
      onClick={handleClick}
      className="font-semibold underline"
    >
      {name}
    </button>
  );
}

const CartItemComponent = ({ cartItem, refetch }: Props) => {
  return (
    <div className="cart-item flex md:flex-row flex-col md:justify-evenly justify-center items-center gap-4 border border-black/25 pl-1 md:w-[450px] w-[250px] md:h-180 h-auto md:pb-0 py-2">
      <div>
        <img
          src={`${apiProtocol}://${apiHost}/${cartItem.product.images[0].url}`}
          alt={cartItem.product.name}
          className="h-32 w-32"
        />
      </div>
      <div className="md:w-auto w-20 h-32 flex flex-col justify-between items-start">
        <div>
          <ProductName name={cartItem.product.name} id={cartItem.productID} />
          <p>
            {cartItem.product.sellingPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}
          </p>
          <p>Quantity: {cartItem.quantity}</p>
        </div>
        <div className="pt-2">
          <DeleteCartItemButton id={cartItem.id} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
