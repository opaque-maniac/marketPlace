import { FormEventHandler, MouseEventHandler } from "react";
import SearchIcon from "./icons/searchIcon";
import { useNavigate } from "react-router-dom";
import ArrowPath from "./icons/arrowpath";

interface Props {
  placeholder: string;
  other?: string;
  otherValue?: string;
}

export default function PageSearchForm({
  placeholder,
  other,
  otherValue,
}: Props) {
  const navigate = useNavigate();

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    if (!query) {
      return;
    }
    const encoded = encodeURIComponent(query);
    let url = `?page=1&query=${encoded}`;

    if (other) {
      url += `&${other}=${otherValue || ""}`;
    }
    navigate(url);
  };

  const resetHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(`?page=1&query=&status=${status}`);
  };

  return (
    <div>
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
        <div className="ml-2">
          <button
            aria-label="Reset query"
            onClick={resetHandler}
            className="block w-6 h-6"
          >
            <ArrowPath />
          </button>
        </div>
      </form>
    </div>
  );
}
