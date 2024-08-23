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
          style={{ minHeight: "30rem" }}
          className="flex justify-center items-center"
        >
          <div>
            <h2 className="text-3xl text-wrap text-center">{`You haven't posted any products yet!`}</h2>
          </div>
        </div>
      ) : (
        <ul>
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
