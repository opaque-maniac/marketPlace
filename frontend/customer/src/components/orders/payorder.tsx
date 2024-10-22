import { OrderStatus } from "../../utils/types";
import CardIcon from "../icons/card";

interface Props {
  status: OrderStatus;
}

const PayOrderButton = ({ status }: Props) => {
  return (
    <div>
      <button
        aria-label={
          status === "CANCELLED" ? "Order has been cancelled" : "Pay for order"
        }
        disabled={status === "CANCELLED"}
        className="w-40 h-10 rounded-md flex justify-center items-center gap-4 text-white bg-green-500"
      >
        <span className="font-semibold">
          {status === "CANCELLED" ? "Cancelled" : "Pay"}
        </span>
        <div className="h-8 w-8">
          <CardIcon />
        </div>
      </button>
    </div>
  );
};

export default PayOrderButton;
