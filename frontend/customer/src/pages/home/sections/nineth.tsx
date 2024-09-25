import Loader from "../../../components/loader";
import ProductList from "../../../components/productlist";
import { Product } from "../../../utils/types";

interface Props {
  products: Product[];
  isLoading: boolean;
}

const NinethSection = ({ products, isLoading }: Props) => {
  return (
    <section style={{ minHeight: "768px" }}>
      <div className="flex justify-start items-center gap-4">
        <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
        <p className="text-red-400 text-xl font-bold">Featured</p>
      </div>
      <div className="flex justify-start items-center py-2">
        <h2 className="text-3xl font-semibold">Other Suggestions</h2>
      </div>
      <div className="md:flex justify-center gap-4 items-center">
        <div style={{ height: "720px" }} className="bg-black md:w-6/12 w-full">
          {isLoading ? (
            <div
              style={{ height: "720px" }}
              className="w-full flex justify-center items-center"
            >
              <div className="h-20 w-20">
                <Loader color="#ffffff" />
              </div>
            </div>
          ) : (
            <div style={{ height: "720px" }}>
              <ProductList
                products={products.slice(0, 4)}
                color="white"
                overflow={false}
                full={false}
              />
            </div>
          )}
        </div>
        <div className="md:w-6/12">
          <div className="bg-black mb-4 h-350 md:mt-0 mt-4">
            {isLoading ? (
              <div
                style={{ height: "350px" }}
                className="w-full flex justify-center items-center"
              >
                <div className="h-20 w-20">
                  <Loader color="#ffffff" />
                </div>
              </div>
            ) : (
              <div className="h-full w-full">
                <ProductList
                  products={products.slice(4, 8)}
                  color="white"
                  overflow={false}
                  full={false}
                />
              </div>
            )}
          </div>
          <div className="md:flex justify-center items-center gap-4">
            <div className="bg-black h-350 w-full">
              {isLoading ? (
                <div
                  style={{ height: "350px" }}
                  className="w-full flex justify-center items-center"
                >
                  <div className="h-20 w-20">
                    <Loader color="#ffffff" />
                  </div>
                </div>
              ) : (
                <div style={{ height: "350px" }}>
                  <ProductList
                    products={products.slice(8, 12)}
                    color="white"
                    overflow={false}
                    full={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NinethSection;
