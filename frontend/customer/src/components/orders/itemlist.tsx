import { OrderItem } from "../../utils/types";
import OrderItemComponent from "./orderProduct";

interface Props {
  items: OrderItem[];
}

const OrderItemList = ({ items }: Props) => {
  return (
    <div>
      {items.length === 0 ? (
        <section className="min-h-400 w-full flex justify-center items-center">
          <div className="md:w-10/12 w-full">
            <p>No Order Items In This Order</p>
          </div>
        </section>
      ) : (
        <section className="min-h-400 w-full">
          <ul
            className={`flex h-full flex-wrap md:flex-row flex-col gap-10 md:pl-10 lg:p-0 justify-evenly items-center`}
          >
            {items.map((item) => (
              <li key={item.id}>
                <OrderItemComponent item={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default OrderItemList;
