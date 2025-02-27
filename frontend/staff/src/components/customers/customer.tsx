import { Link } from "react-router-dom";
import { Customer } from "../../utils/types";
import TickIcon from "../icons/tick";
import CloseIcon from "../icons/closeIcon";
import { formatDate } from "../../utils/date";
import { apiHost, apiProtocol } from "../../utils/generics";

interface Props {
  customer: Customer;
}

const CustomerItem = ({ customer }: Props) => {
  return (
    <Link
      to={`/customers/${customer.id}`}
      className="block h-350 w-270 border pt-1"
    >
      <div>
        <div className="h-200 w-170 bg-gray-500 mx-auto">
          <img
            src={
              customer.image
                ? `${apiProtocol}://${apiHost}/${customer.image.url}`
                : "/images/profile.svg"
            }
            alt={`${customer.firstName} ${customer.lastName}`}
            className="h-full w-full"
          />
        </div>
        <div className="w-full text-center pt-4">
          <p className="font-semibold">{customer.email}</p>
          <p>
            {customer.firstName} {customer.lastName}
          </p>
          <div className="flex justify-center items-center gap-[5px]">
            <p>Active: </p>
            <div
              className={`w-5 h-5 border rounded-full p-[2px] ${customer.active ? "text-green-500 border-green-500" : "text-red-500 border-red-500"}`}
            >
              {customer.active ? <TickIcon /> : <CloseIcon />}
            </div>
          </div>
          <div>
            <p>{formatDate(customer.createdAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CustomerItem;
