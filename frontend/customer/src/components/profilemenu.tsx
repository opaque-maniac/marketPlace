import { Link } from "react-router-dom";
import Transition from "./transition";

const ProfileMenu = () => {
  return (
    <Transition>
      <div
        style={{
          bottom: "-10.2rem",
          left: "-7rem",
        }}
        className="absolute bg-gradient-to-bl from-white to-gray-600 z-20 h-40 w-200 rounded-xl flex justify-center items-center bg-opacity-90 shadow"
      >
        <ul>
          <li
            style={{
              height: "3rem",
            }}
          >
            <div>
              <Link to={"/profile"}>
                <p>Manage My Account</p>
              </Link>
            </div>
          </li>
          <li
            style={{
              height: "3rem",
            }}
          >
            <div>
              <Link to={"/orders"}>
                <p>My Orders</p>
              </Link>
            </div>
          </li>
          <li
            style={{
              height: "3rem",
            }}
          >
            <div>
              <Link to={"/logout"}>
                <p>Log Out</p>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  );
};

export default ProfileMenu;
