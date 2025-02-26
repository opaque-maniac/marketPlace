import { FormEventHandler } from "react";
import SearchIcon from "./icons/searchIcon";
import { useNavigate } from "react-router-dom";

interface Props {
  callback: () => void;
}

const SearchForm = ({ callback }: Props) => {
  const navigate = useNavigate();

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.currentTarget);
    const query = formDate.get("query") as string;
    const encoded = encodeURIComponent(query);
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`?page=1&query=${encoded}`);
    }, 100);
    callback();
  };

  return (
    <form
      className="flex justify-start items-center h-12 border w-full rounded-r"
      onSubmit={submitHandler}
    >
      <div className="w-11/12 pl-2 h-full border-r">
        <label htmlFor="query" className="sr-only">
          Query
        </label>
        <input
          type="text"
          name="query"
          id="query"
          placeholder="Query"
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
