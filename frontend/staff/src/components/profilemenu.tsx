import { Link } from "react-router-dom";
import Transition from "./transition";
import { MouseEventHandler } from "react";

interface Props {
  callback: () => void;
}

const ProfileMenu = ({ callback }: Props) => {
  const clickHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    setTimeout(() => {
      callback();
    }, 100);
  };

  return (
    <Transition time={0.3}>
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
              <Link onClick={clickHandler} to={"/profile"}>
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
              <Link onClick={clickHandler} to={"/orders"}>
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
              <Link onClick={clickHandler} to={"/logout"}>
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
