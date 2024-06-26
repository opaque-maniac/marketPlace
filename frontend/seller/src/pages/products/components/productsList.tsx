import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetchProducts from "./fetchProducts";
import Loader from "../../../components/loader";
import { ProductData } from "../pageTypes";

const ProductsList = () => {
  const [page, setPage] = useState<number>(1);

  const query = useQuery(["products", page], fetchProducts);

  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const data = query.data as ProductData;

  return (
    <div>
      <section>
        {data.products && data.products.length > 0 ? (
          <ul>
            {data.products?.map((product) => (
              <li key={product.id}></li>
            ))}
          </ul>
        ) : (
          <div>
            <h2>No products found</h2>
          </div>
        )}
      </section>
      <div id="pagination">
        <div>
          <button disabled={page === 1 ? true : false}>Prev</button>
        </div>
        <div>
          <span>{page}</span>
        </div>
        <div>
          <button disabled={data.hasNextPage ? false : true}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
