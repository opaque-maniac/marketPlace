import { Link } from "react-router-dom";
import Loader from "../../../components/loader";
import ProductList from "../../../components/products/productlist";
import { Product } from "../../../utils/types";

interface Props {
  products: Product[];
  isLoading: boolean;
}

const FifthSection = ({ products, isLoading }: Props) => {
  return (
    <section style={{ minHeight: "518px" }} className="mt-4 mb-32">
      {" "}
      <div className="flex justify-start items-center gap-4">
        <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
        <p className="text-red-400 text-xl font-bold">Check these out</p>
      </div>
      <div className="h-20 flex md:justify-between items-center justify-center md:gap-0 gap-6 md:px-8">
        <h2 className="text-3xl font-semibold">Best Selling Products</h2>
        <Link
          to={"/explore"}
          aria-label="View All Products"
          className="flex justify-center items-center w-40 h-14 rounded-sm bg-red-400 text-white"
        >
          <span>View All</span>
        </Link>
      </div>
      {isLoading ? (
        <div
          style={{ height: "calc(518px - 7.6rem)" }}
          className="w-full flex justify-center items-center"
        >
          <div className="h-20 w-20">
            <Loader color="#000000" />
          </div>
        </div>
      ) : (
        <div
          style={{ minHeight: "calc(518px - 7.6rem)" }}
          className="w-full flex justify-center items-center px-2"
        >
          <ProductList
            products={products}
            color="black"
            overflow={false}
            full={false}
          />
        </div>
      )}
    </section>
  );
};

export default FifthSection;
