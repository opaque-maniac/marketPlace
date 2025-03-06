import { Link, useNavigate } from "react-router-dom";
import NavItem from "./navitem";
import LogoutIcon from "./icons/logout";
import { logoutFunction } from "../utils/logout";

type Data = {
  placeholder: string;
  label: string;
  url: string;
  other?: string;
};

const data: Data[] = [
  {
    placeholder: "Find Product",
    label: "Products",
    url: "/products",
  },
  {
    placeholder: "Find Customer",
    label: "Customers",
    url: "/customers",
    other: "acitve",
  },
  {
    placeholder: "Find Seller",
    label: "Seller",
    url: "/sellers",
    other: "acitve",
  },
  {
    placeholder: "Find Staff",
    label: "Staff",
    url: "/staff",
    other: "acitve",
  },
  {
    placeholder: "Order ID",
    label: "Orders",
    url: "/orders",
    other: "status",
  },
  {
    placeholder: "Find Complaint",
    label: "Complaints",
    url: "/complaints",
    other: "resolved",
  },
  {
    placeholder: "Find Misconduct",
    label: "Misconducts",
    url: "/misconducts",
  },
];

interface Props {
  callback: () => void;
}

const AuthNavigation = ({ callback }: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end pr-4 pt-4 pb-4">
        <button
          aria-label="Logout"
          onClick={(e) => {
            e.preventDefault();
            setTimeout(() => {
              callback();
            }, 300);
            logoutFunction(navigate, true);
          }}
          className="w-7 h-7 p-1"
        >
          <LogoutIcon />
        </button>
      </div>
      <nav>
        <ul>
          {data.map((item, idx) => (
            <li key={idx}>
              <NavItem
                callback={callback}
                placeholder={item.placeholder}
                url={item.url}
                label={item.label}
                other={item.other ?? undefined}
              />
            </li>
          ))}
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  callback();
                }, 10);
                navigate("/new-misconduct");
              }}
              to={"/new-misconduct"}
              className="flex items-center bg-gray-100 h-9 mb-2 pl-2 w-full text-start mt-2"
            >
              <span>New Misconduct</span>
            </Link>
          </li>
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  callback();
                }, 10);
                navigate("/profile");
              }}
              to={"/profile"}
              className="flex items-center bg-gray-100 h-9 mb-2 pl-2 w-full text-start mt-2"
            >
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AuthNavigation;
