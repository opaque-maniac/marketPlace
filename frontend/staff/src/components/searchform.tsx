import { FormEventHandler } from "react";
import SearchIcon from "./icons/searchIcon";
import { useNavigate } from "react-router-dom";

interface Props {
  placeholder: string;
  label: string;
  other?: string;
}

export default function PageSearchForm({ placeholder, label, other }: Props) {
  const navigate = useNavigate();

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query") as string;
    const encoded = encodeURIComponent(query);
    let url = `?page=1&query=${encoded}`;
    if (other) {
      const otherVal =
        new URLSearchParams(window.location.search).get(other) || "";
      url += `&${other}=${otherVal}`;
    }
    navigate(url);
    window.scrollTo(0, 0);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="border border-black/20 flex items-center w-full mx-auto pr-[5px]"
    >
      <div className="w-11/12">
        <label htmlFor="search" className="sr-only">
          {label}
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
