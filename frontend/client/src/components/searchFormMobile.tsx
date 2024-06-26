import SearchIcon from "./icons/searchIcon";

const SearchFormMobile = () => {
  return (
    <form className="flex justify-start bg-gray-200 px-2 w-11/12 md:mx-0 mx-auto md:w-auto">
      <div>
        <label htmlFor="searchMobile" className="sr-only">
          Search Bar
        </label>
        <input
          type="search"
          name="search"
          id="searchMobile"
          className="bg-transparent h-10 w-48 md:w-32 focus:outline-none focus:border-transparent"
          placeholder="Search"
        />
      </div>
      <div className="bg-transparent h-10 bg-white w-6 flex items-center">
        <button type="submit" className="h-6 w-6 rounded-full">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default SearchFormMobile;
