import { useState } from "react";
import { CartItem } from "../utils/types";
import CartQuantity from "./cartQuantity";

interface Props {
  cartItem: CartItem;
}

const CartItem = ({ cartItem }: Props) => {
  const [quantity, setQuantity] = useState<number>(cartItem.quantity);

  const callback = (value: number) => {
    setQuantity(() => value);
  };

  return (
    <div>
      <div>
        <img src={cartItem.product.images[0].url} alt={cartItem.product.name} />
      </div>
      <div>
        <h2>{cartItem.product.name}</h2>
        <p>Price: ${cartItem.product.price}</p>
        <p>Quantity: {quantity}</p>
      </div>
      <CartQuantity
        quantity={quantity}
        callback={callback}
        id={cartItem.product.id}
      />
    </div>
  );
};
