import { Suspense } from "react";
import ProductItem from "../../components/product";
import { Product } from "../../utils/types";
import Loader from "../../components/loader";

interface Props {
  products: Product[];
}

const ProductFallback = () => {
  return (
    <div className="w-[270px] h-[350px] flex justify-center items-center">
      <div className="w-10 h-10">
        <Loader color="#000000" />
      </div>
    </div>
  );
};

// Explicitly type the return value as JSX.Element
const ProductsList = ({ products }: Props): JSX.Element => {
  return (
    <section>
      {products.length === 0 ? (
        <div
          style={{
            minHeight: "calc(100vh - 10.8rem)",
          }}
          className="flex justify-center items-center"
        >
          <div>
            <h2 className="text-2xl text-wrap text-center">{`You haven't posted any products yet!`}</h2>
          </div>
        </div>
      ) : (
        <ul
          style={{
            minHeight: "calc(100vh - 5.4rem)",
          }}
          className="flex md:justify-evenly justify-center items-center gap-6 flex-wrap"
        >
          {products.map((product) => (
            <li key={product.id}>
              <Suspense fallback={<ProductFallback />}>
                <ProductItem product={product} />
              </Suspense>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductsList;
