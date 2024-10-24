import { Product } from "../../utils/types";
import ProductItem from "./product";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  return (
    <div>
      {products.length === 0 ? (
        <section
          style={{ height: "calc(100vh- 1.4rem)" }}
          className="w-full flex justify-center items-center"
        >
          <div>
            <p>No Products Found</p>
          </div>
        </section>
      ) : (
        <ul
          style={{ minHeight: "calc(100vh - 1.4rem)" }}
          className="flex md:flex-row flex-col md:justify-evenly flex-wrap gap-4"
        >
          {products.map((product) => (
            <li key={product.id}>
              <ProductItem product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
