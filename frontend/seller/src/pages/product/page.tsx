import { Link, useNavigate, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { useQuery } from "@tanstack/react-query";
import { fetchIndividualProduct } from "../../utils/queries/products";
import { useEffect, useState } from "react";
import errorHandler from "../../utils/errorHandler";
import { ErrorResponse } from "../../utils/types";
import ShowError from "../../components/showErr";
import Loader from "../../components/loader";
import CommentList from "./comments";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/404");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = useQuery({
    queryKey: ["product", id ?? ""],
    queryFn: fetchIndividualProduct,
  });

  if (query.isError) {
    const data = query.error;
    try {
      const error = JSON.parse(data.message) as ErrorResponse;
      const show = errorHandler(error.errorCode, navigate);
      if (show) {
        setErr(error.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        setErr("An unexpected error occurred.");
      }
    }
  }

  const callback = () => {
    setErr(() => null);
  };

  const { data } = query;

  return (
    <Transition>
      <main>
        <div className="h-12">
          {err && <ShowError error={err} callback={callback} />}
        </div>
        {query.isLoading && (
          <div className="h-40 w-40">
            <Loader color="#000000" />
          </div>
        )}
        {query.isSuccess && (
          <>
            {data && data.product ? (
              <>
                <div>
                  <section>
                    <div>
                      <img
                        src={data.product.images[0].url}
                        alt={data.product.name}
                      />
                    </div>
                    <div>
                      {data.product.images.length > 1 ? (
                        <ul>
                          {data.product.images.map((image, index) => {
                            if (index === 0) {
                              return null;
                            }
                            return (
                              <li key={image.id}>
                                <img
                                  src={`http://localhost:3020/${image.url}`}
                                  alt={data.product.name}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </div>
                  </section>
                  <section>
                    <h3>{data.product.name}</h3>
                    <div>
                      <span>{data.product.price}</span>
                      <span>{}</span>
                      <span>
                        {data.product.price -
                          (data.product.price *
                            data.product.discountPercentage) /
                            100}
                      </span>
                    </div>
                    <p>{data.product.description}</p>
                    <div>
                      <p>
                        Created: <span>{data.product.dateCreated}</span>
                      </p>
                      <p>
                        Stock: <span>{data.product.stock}</span>
                      </p>
                    </div>
                  </section>
                </div>
                <section>
                  <div>
                    <Link to={`/${data.product.id}/edit`}>Edit</Link>
                  </div>
                  <div>
                    <Link to={`/${data.product.id}/delete`}>Delete</Link>
                  </div>
                </section>
                <section>
                  {data.product ? (
                    <div>
                      <Transition>
                        <CommentList id={data.product.id} />
                      </Transition>
                    </div>
                  ) : null}
                </section>
              </>
            ) : null}
          </>
        )}
      </main>
    </Transition>
  );
};

export default ProductPage;
