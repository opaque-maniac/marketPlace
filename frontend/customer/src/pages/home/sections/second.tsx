import Loader from "../../../components/loader";
import ProductList from "../../../components/products/productlist";
import { Product } from "../../../utils/types";

interface Props {
  products: Product[];
  isLoading: boolean;
}

const SecondSection = ({ products, isLoading }: Props) => {
  return (
    <section style={{ minHeight: "493px" }}>
      <div className="flex justify-start items-center gap-4">
        <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
        <p className="text-red-400 text-xl font-bold">{`Today's`}</p>
      </div>
      <div
        style={{ height: "calc(493px - 2.7rem)" }}
        className="w-full flex justify-center items-center"
      >
        {isLoading ? (
          <div className="h-10 w-10">
            <Loader color="#000000" />
          </div>
        ) : (
          <ProductList products={products} color="black" overflow={true} />
        )}
      </div>
    </section>
  );
};

export default SecondSection;
