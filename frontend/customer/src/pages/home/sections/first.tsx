import { Link } from "react-router-dom";
import { Product } from "../../../utils/types";
import Loader from "../../../components/loader";
import ProductList from "../../../components/products/productlist";

interface Props {
  products: Product[];
  isLoading: boolean;
}

const FirstSection = ({ products, isLoading }: Props) => {
  return (
    <section className="md:flex justify-between items-center">
      <div className="w-full md:w-4/12 lg:w-3/12 md:pl-2">
        <div className="md:w-10/12 md:border-r border-black h-full">
          <h3 className="font-semibold text-xl md:text-start text-center mb-4">
            Browse Our Categories
          </h3>
          <ul className="flex md:flex-col flex-row flex-wrap justify-center md:items-start items-center md:gap-3 gap-8">
            <li>
              <Link
                to={`/categories/ELECTRONICS`}
                className="lg:no-underline underline lg:hover:underline"
              >
                ELECTRONICS
              </Link>
            </li>
            <li>
              <Link
                to={`/categories/FASHION`}
                className="lg:no-underline underline lg:hover:underline"
              >
                FASHION
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/HOME"}
                className="lg:no-underline underline lg:hover:underline"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/BEAUTY"}
                className="lg:no-underline underline lg:hover:underline"
              >
                BEAUTY
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/SPORTS"}
                className="lg:no-underline underline lg:hover:underline"
              >
                SPORTS
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/FOOD"}
                className="lg:no-underline underline lg:hover:underline"
              >
                FOOD
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/BOOKS"}
                className="lg:no-underline underline lg:hover:underline"
              >
                BOOKS
              </Link>
            </li>
            <li>
              <Link
                to={"/categories/TOYS"}
                className="lg:no-underline underline lg:hover:underline"
              >
                TOYS
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{ height: "400px" }}
        className="w-full md:w-8/12 lg:w-9/12 py-4"
      >
        <div className="bg-black h-full px-2 pb-1">
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <div className="h-10 w-10">
                <Loader color="#ffffff" />
              </div>
            </div>
          ) : (
            <>
              <ProductList
                products={products}
                color="white"
                overflow={true}
                full={false}
                center={true}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
