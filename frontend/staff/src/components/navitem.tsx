import { FormEventHandler, MouseEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "./icons/searchIcon";

interface Props {
  placeholder: string;
  url: string;
  label: string;
  callback: () => void;
}

const NavItem = ({ placeholder, url, label, callback }: Props) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState<boolean>(false);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (e.target instanceof HTMLAnchorElement) {
      navigate(`${url}?page=1&query=`);
      setTimeout(() => {
        callback();
      }, 100);
    } else {
      setClicked((prev) => !prev);
    }
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    const encoded = encodeURIComponent(query);
    setTimeout(() => {
      callback();
      window.scrollTo(0, 0);
    }, 10);
    navigate(`${url}?page=1&query=${encoded}`);
  };

  return (
    <>
      <button
        onClick={clickHandler}
        aria-label="Go to products or search product"
        className="bg-gray-100 w-full h-9 mt-2"
      >
        <Link
          to={url}
          onClick={(e) => e.preventDefault()}
          style={{ fontSize: "16px" }}
          className="block h-8 w-[100px] text-black text-start pl-2"
        >
          {label}
        </Link>
      </button>
      {clicked && (
        <div className="h-20 flex items-center">
          <form
            onSubmit={submitHandler}
            className="border border-black/20 flex items-center w-11/12 mx-auto pr-[5px]"
          >
            <div className="w-11/12">
              <label htmlFor="search" className="sr-only">
                {placeholder}
              </label>
              <input
                type="search"
                className="block h-10 w-full px-1 focus:outline-none focus:ring-0"
                name="query"
                placeholder={placeholder}
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
    </>
  );
};

export default NavItem;
