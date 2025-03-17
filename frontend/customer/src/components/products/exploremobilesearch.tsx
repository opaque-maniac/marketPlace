import { FormEventHandler, MouseEventHandler, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../icons/searchIcon";
import ArrowPath from "../icons/arrowpath";

export default function MobileSearchForm() {
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement | null>(null);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formDate = new FormData(e.currentTarget);
    const query = formDate.get("query") as string;
    const encoded = encodeURIComponent(query);
    navigate(`/explore?page=1&query=${encoded}`);
  };

  const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    form.current?.reset();
    navigate("?page=1&query=");
  };

  return (
    <div className="w-full flex items-center justify-center gap-[10px] border border-black px-[5px]">
      <form
        onSubmit={submitHandler}
        ref={form}
        className="flex justify-start items-center md:h-10 h-12 px-2 w-11/12 mx-auto"
      >
        <div className="w-11/12">
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
          <button
            type="submit"
            aria-label="Send Search Query"
            className="block h-6 w-6"
          >
            <SearchIcon />
          </button>
        </div>
      </form>
      <div>
        <button onClick={onclick} aria-label="Reset" className="block w-6 h-6">
          <ArrowPath />
        </button>
      </div>
    </div>
  );
}
