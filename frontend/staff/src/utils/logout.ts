import { NavigateFunction } from "react-router-dom";
import { removeAccessToken, removeRefreshToken } from "./cookies";
import useUserStore from "./store";

export const logoutFunction = (
  navigate: NavigateFunction,
  redirect?: boolean,
) => {
  const removeUser = useUserStore((state) => state.removeUser);
  const removeRole = useUserStore((state) => state.removeRole);

  removeAccessToken();
  removeRefreshToken();
  removeRole();
  removeUser();
  if (redirect) {
    navigate("/", { replace: true });
  }
};
