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
    <ul>
      <li>
        <Link
          className="block text-black text-start pl-2 bg-gray-100 md:w-72 w-52 h-8 mt-2"
          to="/about"
          onClick={(e) => clickHandler(e, "/about")}
        >
          <span>About</span>
        </Link>
      </li>
      <li>
        <Link
          className="block text-black text-start pl-2 bg-gray-100 md:w-72 w-52 h-8 mt-2"
          to="/terms"
          onClick={(e) => clickHandler(e, "/terms")}
        >
          <span>Terms & Conditions</span>
        </Link>
      </li>
      <li>
        <Link
          className="block text-black text-start pl-2 bg-gray-100 md:w-72 w-52 h-8 mt-2"
          to="/privacy"
          onClick={(e) => clickHandler(e, "/privacy")}
        >
          <span>Privacy</span>
        </Link>
      </li>
      <li>
        <Link
          className="block text-black text-start pl-2 bg-gray-100 md:w-72 w-52 h-8 mt-2"
          to="/login"
          onClick={(e) => clickHandler(e, "/login")}
        >
          <span>Log In</span>
        </Link>
      </li>
      <li>
        <Link
          className="block text-black text-start pl-2 bg-gray-100 md:w-72 w-52 h-8 mt-2"
          to="/register"
          onClick={(e) => clickHandler(e, "/register")}
        >
          <span>Sign Up</span>
        </Link>
      </li>
    </ul>
  );
};

export default NoAuthNav;
