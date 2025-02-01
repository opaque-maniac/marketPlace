import { NavigateFunction } from "react-router-dom";
import { removeAccessToken, removeRefreshToken, removeUserID } from "./cookies";

export const logoutFunction = (navigate: NavigateFunction) => {
  removeAccessToken();
  removeRefreshToken();
  removeUserID();
  navigate("/", { replace: true });
};
