import ProductItem from "../../components/product";
import { Product } from "../../utils/types";

interface Props {
  products: Product[];
}

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
            <h2 className="text-3xl text-wrap text-center">{`You haven't posted any products yet!`}</h2>
          </div>
        </div>
      ) : (
        <ul
          style={{
            minHeight: "calc(100vh - 10.8rem)",
          }}
          className="flex md:justify-start justify-center items-center gap-6 flex-wrap h-full"
        >
          {products.map((product) => (
            <li key={product.id}>
              <ProductItem product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProductsList;
