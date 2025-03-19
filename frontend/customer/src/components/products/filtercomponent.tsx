import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import MobileSearchForm from "./exploremobilesearch";
import { categoriesArray, priceRanges } from "../../utils/price";
import Transition from "../transition";
import { ProductFilterContext } from "../../utils/productContext";

export default function FilterComponent() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [filters, setFilters] = useContext(ProductFilterContext);

  const onclick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const minChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    const value = parseInt(e.currentTarget.value);
    setFilters({ ...filters, minprice: value });
  };

  const maxChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    const value = parseInt(e.currentTarget.value);
    setFilters({ ...filters, maxprice: value });
  };

  const categoryChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    setFilters({ ...filters, category: e.currentTarget.value });
  };

  return (
    <div>
      <Transition>
        <div
          style={{
            display: clicked ? "block" : "none",
          }}
        >
          <form onSubmit={submitHandler}>
            <div className="flex md:flex-row flex-col md:justify-around items-center md:gap-0 gap-2">
              <div>
                <label htmlFor="minprice">Minimum Price</label>
                <select
                  value={filters.minprice.toString()}
                  name="minprice"
                  id="minprice"
                  onChange={minChangeHandler}
                  className="block h-10 w-52 border border-black/20"
                >
                  {priceRanges.map((range, idx) => (
                    <option key={idx} value={range.toString()}>
                      {range.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="minprice">Maximum Price</label>
                <select
                  value={filters.maxprice.toString()}
                  name="minprice"
                  id="minprice"
                  onChange={maxChangeHandler}
                  className="block h-10 w-52 border border-black/20"
                >
                  {priceRanges.map((range, idx) => (
                    <option key={idx} value={range.toString()}>
                      {range.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <select
                  value={filters.category}
                  name="category"
                  id="category"
                  onChange={categoryChangeHandler}
                  className="block h-10 w-52 border border-black/20"
                >
                  {categoriesArray.map((category, idx) => (
                    <option key={idx} value={category}>
                      {category ? category : "All"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </Transition>
      <div className="flex md:justify-end justify-center items-center gap-1 md:pt-1 pt-2">
        <div className="md:hidden block">
          <MobileSearchForm />
        </div>
        <div className="xl:pr-10 lg:pr-16 md:pr-8">
          <button
            onClick={onclick}
            aria-label={clicked ? "Close filters" : "Open filters"}
            className="block w-8 md:h-8 h-10 border border-black/20"
          ></button>
        </div>
      </div>
    </div>
  );
}
