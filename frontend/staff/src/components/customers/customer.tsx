import { Link } from "react-router-dom";
import { Customer } from "../../utils/types";

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
                ? `http://localhost:3020/${customer.image.url}`
                : "/images/profile.svg"
            }
            alt={`${customer.firstName} ${customer.lastName}`}
            className="h-full w-full"
          />
        </div>
        <div className="w-full text-center pt-4">
          <p>
            {customer.firstName} {customer.lastName}
          </p>
          <p>{customer.email}</p>
          <p>
            Active:{" "}
            <span className="font-semibold">
              {customer.active ? "Yes" : "No"}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CustomerItem;
