import { NavigateFunction } from "react-router-dom";
import {
  removeAccessToken,
  removeRefreshToken,
  removeUserID,
  removeProfileImage,
} from "./cookies";
import useUserStore from "./store";

export const logoutFunction = (
  navigate: NavigateFunction,
  redirect?: boolean,
) => {
  const removeUser = useUserStore((state) => state.removeUser);
  removeAccessToken();
  removeRefreshToken();
  removeUserID();
  removeUser();
  removeProfileImage();
  removeUserID();
  if (redirect) {
    navigate("/", { replace: true });
  }
};
