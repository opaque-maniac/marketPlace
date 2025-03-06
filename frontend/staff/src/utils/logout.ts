import { NavigateFunction } from "react-router-dom";
import {
  removeAccessToken,
  removeRefreshToken,
  removeStaffRole,
  removeUserID,
} from "./cookies";
import useUserStore from "./store";

export const logoutFunction = (
  navigate: NavigateFunction,
  redirect?: boolean,
) => {
  console.log("Called");
  const removeUser = useUserStore((state) => state.removeUser);
  const removeRole = useUserStore((state) => state.removeRole);

  removeAccessToken();
  removeRefreshToken();
  removeUserID();
  removeStaffRole();
  removeUser();
  removeRole();

  if (redirect) {
    navigate("/", { replace: true });
  }
};
