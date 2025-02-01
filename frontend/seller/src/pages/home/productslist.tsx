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
        <div className="flex justify-center items-center h-screen">
          <div>
            <h2 className="text-2xl text-wrap text-center">{`No products have been found!`}</h2>
          </div>
        </div>
      ) : (
        <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
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
