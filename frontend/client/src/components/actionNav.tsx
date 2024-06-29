import { Link } from "react-router-dom";
import LogoutIcon from "./icons/Logout";
import SmallProfileIcon from "./icons/SmallProfile";
import { MouseEventHandler } from "react";
import OrderIcon from "./icons/OrderIcon";

interface PropsTypes {
  actionLinkClick: MouseEventHandler<HTMLAnchorElement>;
}

const ActionNav = ({ actionLinkClick }: PropsTypes) => {
  return (
    <ul>
      <li className="mb-4">
        <Link
          to={"/profile"}
          onClick={actionLinkClick}
          className="flex justify-start gap-4"
        >
          <div>
            <SmallProfileIcon />
          </div>
          <span>Manage My Profile</span>
        </Link>
      </li>
      <li className="mb-4">
        <Link
          to={"/orders"}
          onClick={actionLinkClick}
          className="flex justify-start gap-4"
        >
          <div>
            <OrderIcon />
          </div>
          <span>My Orders</span>
        </Link>
      </li>
      <li>
        <Link
          to={"/logout"}
          onClick={actionLinkClick}
          className="flex justify-start gap-4"
        >
          <div>
            <LogoutIcon />
          </div>
          <span>Log Out</span>
        </Link>
      </li>
    </ul>
  );
};

export default ActionNav;
