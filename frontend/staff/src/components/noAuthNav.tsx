import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  callback: () => void;
}

const NoAuthNav = ({ callback }: Props) => {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const clickHandler = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    e.preventDefault();
    callback();
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  return (
    <ul className="flex flex-col justify-center items-center gap-6">
      <li>
        <Link
          className={path === "/about" ? "underline" : ""}
          to="/about"
          onClick={(e) => clickHandler(e, "/about")}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className={path === "/terms" ? "underline" : ""}
          to="/terms"
          onClick={(e) => clickHandler(e, "/terms")}
        >
          Terms & Conditions
        </Link>
      </li>
      <li>
        <Link
          className={path === "/privacy" ? "underline" : ""}
          to="/privacy"
          onClick={(e) => clickHandler(e, "/privacy")}
        >
          Privacy
        </Link>
      </li>
      <li>
        <Link
          className={path === "/login" ? "underline" : ""}
          to="/login"
          onClick={(e) => clickHandler(e, "/login")}
        >
          Log In
        </Link>
      </li>
    </ul>
  );
};

export default NoAuthNav;
