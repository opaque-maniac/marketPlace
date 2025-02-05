import { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "./icons/searchIcon";

const OrderSearchForm = () => {
  const navigate = useNavigate();

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.currentTarget);
    const query = formDate.get("query") as string;
    const encoded = encodeURIComponent(query);
    navigate(`?page=1&query=${encoded}`);
  };

  return (
    <form
      className="flex justify-start items-center h-10 border rounded-r w-[250px]"
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
          className="bg-transparent block h-9 focus:border-none focus:outline-none w-full"
        />
      </div>
      <div className="px-1">
        <button
          aria-label="Send Search Query"
          className="block h-10 w-full p-2"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default OrderSearchForm;
