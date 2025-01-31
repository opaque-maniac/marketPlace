import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "./icons/logout";
import { MouseEvent, useMemo } from "react";
import {
  removeAccessToken,
  removeRefreshToken,
  removeUserID,
} from "../utils/cookies";

interface Props {
  callback: () => void;
}

export default function LogoutLink({ callback }: Props) {
  const navigate = useNavigate();

  const logoutHandler = useMemo(
    () => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      removeAccessToken();
      removeRefreshToken();
      removeUserID();

      setTimeout(() => {
        navigate("/");
      }, 100);

      callback();
    },
    [navigate, callback],
  );

  return (
    <Link
      to={"/logout"}
      onClick={logoutHandler}
      className="block h-10 w-10 border text-black/50 hover:text-black focus:text-black border-black/50 hover:border-black focus:border-black p-1 rounded-full"
    >
      <LogoutIcon />
    </Link>
  );
}
