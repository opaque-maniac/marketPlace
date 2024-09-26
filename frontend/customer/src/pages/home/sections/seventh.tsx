import Loader from "../../../components/loader";
import ProductList from "../../../components/productlist";
import { Product } from "../../../utils/types";

interface Props {
  products: Product[];
  isLoading: boolean;
}

const SeventhSection = ({ products, isLoading }: Props) => {
  return (
    <section style={{ minHeight: "900px" }}>
      {isLoading ? (
        <div
          style={{ height: "900px" }}
          className="w-full flex justify-center items-center"
        >
          <div className="h-20 w-20">
            <Loader color="#000000" />
          </div>
        </div>
      ) : (
        <div style={{ minHeight: "900px" }}>
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

export default SeventhSection;
