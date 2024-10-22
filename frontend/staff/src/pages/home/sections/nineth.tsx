import Loader from "../../../components/loader";
import ProductList from "../../../components/products/productlist";
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
        <div
          style={{ minHeight: "800px" }}
          className="bg-black md:w-6/12 w-full p-2"
        >
          {isLoading ? (
            <div
              style={{ minHeight: "730px" }}
              className="w-full flex justify-center items-center"
            >
              <div className="h-20 w-20">
                <Loader color="#ffffff" />
              </div>
            </div>
          ) : (
            <div style={{ minHeight: "720px" }}>
              {products.slice(0, 4).length > 0 ? (
                <>
                  <div className="pb-10 xl:flex justify-center items-center">
                    <div className="md:hidden block">
                      <ProductList
                        products={products.slice(0, 2)}
                        color="white"
                        overflow={false}
                        full={false}
                      />
                    </div>
                    <div className="md:block hidden">
                      <ProductList
                        products={products.slice(0, 2)}
                        color="white"
                        overflow={true}
                        full={false}
                      />
                    </div>
                  </div>
                  <div className="xl:flex justify-center items-center">
                    <div className="md:hidden block">
                      <ProductList
                        products={products.slice(2, 4)}
                        color="white"
                        overflow={false}
                        full={false}
                      />
                    </div>
                    <div className="md:block hidden">
                      <ProductList
                        products={products.slice(2, 4)}
                        color="white"
                        overflow={true}
                        full={false}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <ProductList
                    products={products.slice(0, 4)}
                    color="white"
                    overflow={true}
                    full={true}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="md:w-6/12">
          <div
            className="bg-black mb-4 md:mt-0 mt-4 p-2"
            style={{ minHeight: "390px" }}
          >
            {isLoading ? (
              <div
                style={{ minHeight: "390px" }}
                className="w-full flex justify-center items-center"
              >
                <div className="h-20 w-20">
                  <Loader color="#ffffff" />
                </div>
              </div>
            ) : (
              <div className="h-full w-full xl:flex justify-center items-center">
                <div className="md:block hidden">
                  <ProductList
                    products={products.slice(4, 6)}
                    color="white"
                    overflow={true}
                    full={false}
                  />
                </div>
                <div className="md:hidden block">
                  <ProductList
                    products={products.slice(4, 6)}
                    color="white"
                    overflow={false}
                    full={false}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="md:flex justify-center items-center gap-4">
            <div style={{ minHeight: "390px" }} className="bg-black w-full p-2">
              {isLoading ? (
                <div
                  style={{ minHeight: "390px" }}
                  className="w-full flex justify-center items-center"
                >
                  <div className="h-20 w-20">
                    <Loader color="#ffffff" />
                  </div>
                </div>
              ) : (
                <div
                  style={{ minHeight: "350px" }}
                  className="xl:flex justify-center items-center"
                >
                  <div className="md:block hidden">
                    <ProductList
                      products={products.slice(6, 8)}
                      color="white"
                      overflow={true}
                      full={false}
                    />
                  </div>
                  <div className="md:hidden block">
                    <ProductList
                      products={products.slice(6, 8)}
                      color="white"
                      overflow={false}
                      full={false}
                    />
                  </div>
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
