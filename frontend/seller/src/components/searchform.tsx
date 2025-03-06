import { FormEventHandler } from "react";
import SearchIcon from "./icons/searchIcon";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  callback?: () => void;
}

const SearchForm = ({ callback }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isOrder = pathname.substring(0, "/orders".length) === "/orders";

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.currentTarget);
    const query = formDate.get("query") as string;
    const encoded = encodeURIComponent(query);
    let url = `/?page=1&query=${encoded}`;
    if (isOrder) {
      const status =
        new URLSearchParams(window.location.search).get("status") || "";
      url = `/orders?page=1&query=${encoded}&status=${status}`;
    }
    navigate(url);
    setTimeout(() => {
      if (callback) {
        callback();
      }
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <form
      className="flex justify-start items-center h-full border w-full rounded-r"
      onSubmit={submitHandler}
    >
      <div className="w-11/12 pl-2 h-full border-r">
        <label htmlFor="query" className="sr-only">
          Query {isOrder ? "orders" : "products"}
        </label>
        <input
          type="text"
          name="query"
          id="query"
          placeholder={`Query ${isOrder ? "orders" : "products"}`}
          className="bg-transparent block h-11 focus:border-none focus:outline-none w-full"
        />
      </div>
      <div className="px-1">
        <button aria-label="Send Search Query" className="block h-6 w-6">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
