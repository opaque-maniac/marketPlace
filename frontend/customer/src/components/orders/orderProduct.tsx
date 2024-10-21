import { OrderItem } from "../../utils/types";

interface Props {
  item: OrderItem;
}

const OrderItemComponent = ({ item }: Props) => {
  return (
    <div className="h-350 w-270">
      <div className="h-250">
        <img
          src={`http://localhost:3020/${item.product.images[0].url}`}
          alt={item.product.name}
          className="w-full h-full block"
        />
      </div>
      <div className="h-full w-full">
        <h2>{item.product.name}</h2>
        <p>
          <span className="font-semibold">Quantity: </span>
          {item.quantity}
        </p>
        <p>
          <span className="font-semibold">Ready: </span>
          {item.ready ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default OrderItemComponent;
