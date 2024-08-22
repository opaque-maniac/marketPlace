import SearchIcon from "./icons/searchIcon";

const SearchForm = () => {
  return (
    <form className="flex justify-start items-center border border-black rounded-xl h-12 px-2 w-full md:w-80 mx-auto">
      <div>
        <label htmlFor="query" className="sr-only">
          Query
        </label>
        <input
          type="text"
          name="query"
          id="query"
          placeholder="Query"
          className="bg-transparent block h-11 focus:border-none focus:outline-none border-black md:w-72 w-10/12"
        />
      </div>
      <div>
        <button className="block h-6 w-6">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
