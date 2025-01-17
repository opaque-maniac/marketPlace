import { FormEventHandler, useRef } from "react";
import SearchIcon from "./icons/searchIcon";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement | null>(null);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.currentTarget);
    const query = formDate.get("query") as string;
    const encoded = encodeURIComponent(query);
    form.current?.reset();
    navigate(`/explore?page=1&query=${encoded}`);
  };

  return (
    <form
      onSubmit={submitHandler}
      ref={form}
      className="flex justify-start items-center md:border-none border border-black md:h-10 h-12 px-2 w-full mx-auto bg-gray-100"
    >
      <div className="md:w-11/12 w-10/12">
        <label htmlFor="query" className="sr-only">
          Query
        </label>
        <input
          type="text"
          name="query"
          id="query"
          placeholder="Search"
          className="bg-transparent block h-11 focus:border-none focus:outline-none border-black w-full"
        />
      </div>
      <div>
        <button aria-label="Send Search Query" className="block h-6 w-6">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
