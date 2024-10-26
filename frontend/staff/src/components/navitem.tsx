import { FormEventHandler, MouseEventHandler, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChevronDown from "./icons/chevrondown";
import ChevronUp from "./icons/chevronup";
import SearchIcon from "./icons/searchIcon";

interface Props {
  placeholder: string;
  url: string;
  label: string;
  callback: () => void;
}

const NavItem = ({ placeholder, url, label, callback }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const navigate = useNavigate();

  const clickHandler = useMemo(
    () => (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      e.preventDefault();
      callback();
      setTimeout(() => {
        navigate(path);
      }, 300);
    },
    [callback, navigate],
  );

  const buttonClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked(() => !clicked);
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    setTimeout(() => {
      callback();
    }, 200);
    if (query) {
      navigate(`${url}/search/?query=${query}`);
    } else {
      navigate(`${url}`);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="flex justify-between items-center pr-4 pl-1 bg-gray-100 min-h-14">
        <div>
          <Link onClick={(e) => clickHandler(e, url)} to={url}>
            {label}
          </Link>
        </div>
        <div>
          <button
            onClick={buttonClickHandler}
            className="block text-gray-300 hover:text-black w-7 h-7 rounded-full border border-black/25 hover:border-black"
          >
            {clicked ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>
      <div>
        {clicked && (
          <div className="h-20 flex flex-col justify-center border-b">
            <form
              onSubmit={submitHandler}
              className="h-10 flex justify-start items-center border border-black w-11/12 mx-auto rounded-xl px-1"
            >
              <div className="w-11/12">
                <label htmlFor="query" className="sr-only">
                  {label}
                </label>
                <input
                  type="text"
                  name="query"
                  id="query"
                  placeholder={placeholder}
                  className="block w-full bg-transparent ocus:border-none focus:outline-none pl-1"
                />
              </div>
              <div>
                <button type="submit" className="block w-6 h-6">
                  <SearchIcon />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavItem;
