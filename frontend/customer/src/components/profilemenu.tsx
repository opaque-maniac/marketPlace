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
              <p>Manage My Account</p>
            </div>
          </li>
          <li
            style={{
              height: "3rem",
            }}
          >
            <div>
              <p>My Orders</p>
            </div>
          </li>
          <li
            style={{
              height: "3rem",
            }}
          >
            <div>
              <p>Log Out</p>
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  );
};

export default ProfileMenu;
