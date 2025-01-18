import { Link } from "react-router-dom";
import { Order } from "../../utils/types";
import { formatDate } from "../../utils/date";

interface Props {
  order: Order;
}

const OrderItem = ({ order }: Props) => {
  return (
    <Link
      to={`/orders/${order.id}`}
      className="flex justify-evenly items-center gap-4 border border-black/25 pl-1 md:w-500 w-350 h-180"
    >
      <div>
        <img
          src={`http://localhost:3020/${order.product.images[0].url}`}
          alt={order.product.name}
          className="h-32 w-32"
        />
      </div>
      <div className="md:w-auto w-20">
        <h2 className="font-semibold">{order.product.name}</h2>
        <p>Price: ${order.product.price}</p>
        <p>Quantity: {order.quantity}</p>
        <p>Status: {order.status}</p>
        <p>Date: {formatDate(order.createdAt)}</p>
      </div>
    </Link>
  );
};

export default OrderItem;
