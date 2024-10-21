import { Link } from "react-router-dom";
import { Order } from "../../utils/types";

interface Props {
  order: Order;
}

const OrderItem = ({ order }: Props) => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <Link
      to={`/orders/${order.id}`}
      className="border border-black/25 rounded-md md:w-500 w-350 h-138 p-1 flex justify-start items-center gap-4"
    >
      <div className="font-semibold">
        <p>ID</p>
        <p>DATE</p>
        <p>STATUS</p>
        <p>TOTAL</p>
      </div>
      <div>
        <p>: {order.id}</p>
        <p>: {formatDate(order.updatedAt)}</p>
        <p>: {order.status}</p>
        <p>: ${`${order.totalAmount}`}</p>
      </div>
    </Link>
  );
};

export default OrderItem;
