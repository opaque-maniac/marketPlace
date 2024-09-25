import Loader from "../../../components/loader";
import ProductList from "../../../components/productlist";
import { Product } from "../../../utils/types";

interface Props {
  products: Product[];
  isLoading: boolean;
}

const SixthSection = ({ products, isLoading }: Props) => {
  return (
    <section
      style={{ minHeight: "500px" }}
      className="bg-black mb-32 px-2 lg:pb-0 pb-4"
    >
      {isLoading ? (
        <div
          style={{ height: "500px" }}
          className="w-full flex justify-center items-center"
        >
          <div className="h-20 w-20">
            <Loader color="#ffffff" />
          </div>
        </div>
      ) : (
        <div
          style={{ minHeight: "500px" }}
          className="lg:flex justify-center items-center"
        >
          <ProductList
            products={products}
            color="white"
            overflow={false}
            full={false}
          />
        </div>
      )}
    </section>
  );
};

export default SixthSection;
