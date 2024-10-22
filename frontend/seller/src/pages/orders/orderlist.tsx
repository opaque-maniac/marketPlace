import { Link } from "react-router-dom";
import Transition from "../../components/transition";
import { OrderItem } from "../../utils/types";

interface Props {
  orders: OrderItem[];
}

const OrdersList = ({ orders }: Props) => {
  return (
    <Transition>
      <section
        style={{
          minHeight: "calc(100vh - 10.8rem)",
        }}
      >
        {orders.length > 0 ? (
          <div className="flex flex-col gap-4 md:pl-2 pl-1">
            {orders.map((order) => (
              <Link to={`/orders/${order.id}`} key={order.id}>
                <div key={order.id} className="border-b border-gray-200 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-lg font-semibold">
                        Order ID: {order.id}
                      </h1>
                      <p className="text-sm text-gray-500">
                        Ordered on: {new Date(order.createdAt).toDateString()}
                      </p>
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold">
                        Total: ${order.product.price * order.quantity}
                      </h1>
                      <p className="text-sm text-gray-500">
                        Status: {order.ready ? "Ready" : "Not Ready"}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="flex justify-center items-center"
            style={{
              minHeight: "calc(100vh - 10.8rem)",
            }}
          >
            <h1 className="text-3xl font-semibold">No orders available</h1>
          </div>
        )}
      </section>
    </Transition>
  );
};

export default OrdersList;
