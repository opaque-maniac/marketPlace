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
        <p className="text-red-400 text-lg font-bold">Featured</p>
      </div>
      <div className="flex justify-start items-center py-2">
        <h2 className="text-3lg font-semibold">Other Suggestions</h2>
      </div>
      <div className="md:flex justify-center gap-4 items-center">
        <div className="bg-black md:w-6/12 w-full p-2 md:min-h-[800px] min-h-[370px]">
          {isLoading ? (
            <div className="w-full flex justify-center items-center md:h-[800px] h-[370px]">
              <div className="h-10 w-10">
                <Loader color="#ffffff" />
              </div>
            </div>
          ) : (
            <div className="md:min-h-[770px] min-h-[370px]">
              {/* lg: screen */}
              <div className="lg:block hidden">
                <ProductList
                  products={products.slice(0, 4)}
                  color="white"
                  overflow={false}
                  full={false}
                  zeroHeight="770px"
                />
              </div>

              {/* md: screen */}
              <div className="lg:hidden md:block hidden">
                {products.slice(0, 4).length === 0 ? (
                  <ProductList
                    products={products.slice(0, 4)}
                    color="white"
                    overflow={false}
                    full={false}
                    zeroHeight="770px"
                  />
                ) : (
                  <div className="flex-col justify-between items-center">
                    <div>
                      <ProductList
                        products={products.slice(0, 4)}
                        color="white"
                        overflow={true}
                        full={false}
                        zeroHeight="370px"
                      />
                    </div>
                    <div>
                      <ProductList
                        products={products.slice(0, 4)}
                        color="white"
                        overflow={true}
                        full={false}
                        zeroHeight="370px"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* sm: screen */}
              <div className="md:hidden block">
                <ProductList
                  products={products.slice(0, 4)}
                  color="white"
                  overflow={false}
                  full={false}
                  zeroHeight="370px"
                />
              </div>
            </div>
          )}
        </div>

        <div className="md:w-6/12">
          {/* second section */}
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
              <div className="h-full w-full lg:flex justify-center items-center">
                <div className="md:block hidden">
                  <ProductList
                    products={products.slice(4, 6)}
                    color="white"
                    overflow={true}
                    full={false}
                    zeroHeight="370px"
                  />
                </div>
                <div className="md:hidden block">
                  <ProductList
                    products={products.slice(4, 6)}
                    color="white"
                    overflow={false}
                    full={false}
                    zeroHeight="370px"
                  />
                </div>
              </div>
            )}
          </div>

          {/* third section */}
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
                  className="lg:flex justify-center items-center"
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
                      zeroHeight="370px"
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
