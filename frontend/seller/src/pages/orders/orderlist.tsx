import { lazy, Suspense } from "react";
import Transition from "../../components/transition";
import { Order } from "../../utils/types";
import Loader from "../../components/loader";

const OrderItem = lazy(() => import("../../components/order"));

const Fallback = () => {
  return (
    <div className="w-[350px] h-[200px] flex justify-center items-center">
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

interface Props {
  orders: Order[];
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
          <ul className="grid xl:grid-cols-2 grid-cols-1">
            {orders.map((order) => (
              <li key={order.id} className="mx-auto pb-6">
                <Suspense fallback={<Fallback />}>
                  <OrderItem order={order} />
                </Suspense>
              </li>
            ))}
          </ul>
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
