import { NavigateFunction } from "react-router-dom";
import { removeAccessToken, removeRefreshToken, removeUserID } from "./cookies";
import useUserStore from "./store";

export const logoutFunction = (
  navigate: NavigateFunction,
  redirect?: boolean,
) => {
  const removeUser = useUserStore((state) => state.removeUser);
  removeAccessToken();
  removeRefreshToken();
  removeUser();
  removeUserID();
  if (redirect) {
    navigate("/", { replace: true });
  }
};
