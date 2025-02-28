import { FormEventHandler } from "react";
import SearchIcon from "../icons/searchIcon";
import { useNavigate } from "react-router-dom";

interface Props {
  placeholder: string;
  label: string;
}

export default function PageSearchForm({ placeholder }: Props) {
  const navigate = useNavigate();

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    const encoded = encodeURIComponent(query);
    navigate(`?page=1&query=${encoded}`);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="border border-black/20 flex items-center w-full mx-auto pr-[5px]"
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
  );
}
