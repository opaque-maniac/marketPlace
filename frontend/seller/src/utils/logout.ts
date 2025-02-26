import { NavigateFunction } from "react-router-dom";
import { removeAccessToken, removeRefreshToken } from "./cookies";
import useUserStore from "./store";

export const logoutFunc = (navigate: NavigateFunction, redirect?: boolean) => {
  const removeUser = useUserStore((state) => state.removeUser);
  removeAccessToken();
  removeRefreshToken();
  removeUser();
  if (redirect) {
    navigate("/login");
  }
};
