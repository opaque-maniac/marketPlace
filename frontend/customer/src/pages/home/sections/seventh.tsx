import Loader from "../../../components/loader";
import ProductList from "../../../components/products/productlist";
import { Product } from "../../../utils/types";

interface Props {
  products: Product[];
  isLoading: boolean;
}

const SeventhSection = ({ products, isLoading }: Props) => {
  return (
    <section className="md:min-h-[900px] min-h-[370px]">
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-[900px]">
          <div className="h-10 w-10">
            <Loader color="#000000" />
          </div>
        </div>
      ) : (
        <div className="md:min-h-[900px] min-h-[370px]">
          <div className="md:block hidden">
            <ProductList
              products={products}
              color="black"
              overflow={false}
              full={false}
              zeroHeight="900px"
            />
          </div>
          <div className="md:hidden block">
            <ProductList
              products={products}
              color="black"
              overflow={false}
              full={false}
              zeroHeight="370px"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SeventhSection;
