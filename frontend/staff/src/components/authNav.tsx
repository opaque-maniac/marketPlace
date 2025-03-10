import { Link, useNavigate } from "react-router-dom";
import NavItem from "./navitem";
import LogoutIcon from "./icons/logout";
import { logoutFunction } from "../utils/logout";

type Data = {
  placeholder: string;
  label: string;
  url: string;
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
  },
  {
    placeholder: "Find Seller",
    label: "Sellers",
    url: "/sellers",
  },
  {
    placeholder: "Find Staff",
    label: "Staff",
    url: "/staff",
  },
  {
    placeholder: "Order ID",
    label: "Orders",
    url: "/orders",
  },
  {
    placeholder: "Find Complaint",
    label: "Complaints",
    url: "/complaints",
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
          <li>
            <Link
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => {
                  callback();
                }, 10);
                navigate("/");
              }}
              to={"/"}
              className="flex items-center bg-gray-100 h-9 mt-2 pl-2 w-full text-start"
            >
              <span>Home</span>
            </Link>
          </li>
          {data.map((item, idx) => (
            <li key={idx}>
              <NavItem
                callback={callback}
                placeholder={item.placeholder}
                url={item.url}
                label={item.label}
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
