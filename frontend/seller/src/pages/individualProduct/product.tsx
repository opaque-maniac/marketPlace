import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import fetchProduct from "./components/fetchProduct";
import Loader from "../../components/loader";
import { ProductResponse } from "./pageTypes";
import ProductImages from "./components/productImages";

const IndividualProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/error/404", { replace: true });
  }

  const response = useQuery(["product", id as string], fetchProduct);

  if (response.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (response.isError) {
    const error = response.error as Error;
    return (
      <div>
        <div>
          <h1>{error.message}</h1>
        </div>
      </div>
    );
  }

  const data = response.data as ProductResponse;

  return (
    <section>
      <div>
        <ProductImages images={data.product.images} name={data.product.name} />
      </div>
      <div className="flex justify-center items-center gap-10 mt-10">
        <Link
          to={`/products/${data.product.id}/edit`}
          className="md:hover:underline underline md:no-underline"
        >
          Edit Product
        </Link>
        <Link
          to={`/products/${data.product.id}/delete`}
          className="md:hover:underline underline md:no-underline"
        >
          Delete Product
        </Link>
      </div>
      <div>
        <div className="text-center pt-4">
          <h2 className="text-2xl font-bold">
            {data.product.name.toUpperCase()}
          </h2>
          <p>{data.product.category}</p>
          <p>
            Created: <span>{data.product.dateCreated}</span>
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 md:flex-row flex-col">
          <p>
            Price: <span className="font-bold">{`${data.product.price}`}</span>
          </p>
          <p>
            Sales: <span className="font-bold">{data.product.sales}</span>
          </p>
          <p>
            Discount:{" "}
            <span className="font-bold">{`${data.product.discountPercentage}`}</span>
          </p>
          <p>
            Stock: <span className="font-bold">{data.product.stock}</span>
          </p>
        </div>
        <div className="pt-4">
          <p className="md:w-10/12 w-11/12 mx-auto">
            {data.product.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndividualProduct;
