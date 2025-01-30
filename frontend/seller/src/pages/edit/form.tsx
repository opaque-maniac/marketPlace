import Transition from "../../components/transition";
import { Product } from "../../utils/types";
import useProductForm from "./useProductForm";
import { FormEventHandler, useContext } from "react";
import Loader from "../../components/loader";
import { useMutation } from "@tanstack/react-query";
import { sendUpdateProduct } from "../../utils/mutations/products/updateproduct";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

interface Props {
  product: Product;
}

const ProductForm = ({ product }: Props) => {
  const { state, dispatch, ActionType } = useProductForm(product);
  const { id } = useParams();
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);

  const { mutate, isPending } = useMutation({
    mutationFn: sendUpdateProduct,
    onSuccess: (data) => {
      if (data) {
        navigate(`/products/${id}`);
      } else {
        setError(true);
        navigate("/500", { replace: true });
      }
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate({ data: formData, id: id as string });
  };

  return (
    <Transition>
      <section
        className="md:flex justify-center items-center"
        style={{
          minHeight: "calc(100vh - 14rem)",
        }}
      >
        <form
          onSubmit={submitHandler}
          className="lg:w-7/12 md:w-10/12 w-11/12 mx-auto shadow-xl border rounded-lg py-2 lg:px-2"
        >
          <div className="flex md:justify-between justify-center items-center md:flex-row flex-col gap-2 md:mb-4 mb-4">
            <div className="md:mb-0 mb-4">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={state.name}
                onChange={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_NAME,
                    payload: e.target.value,
                  })
                }
                onBlur={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_NAME,
                    payload: e.target.value,
                  })
                }
                placeholder="Name"
                className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
                required
              />
            </div>
            <div className="md:mb-0 mb-4">
              <label htmlFor="price" className="sr-only">
                Initial Price
              </label>
              <input
                type="text"
                name="buyingPrice"
                id="buyingPrice"
                value={state.buyingPrice}
                onChange={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_BUYINGPRICE,
                    payload: e.target.value,
                  })
                }
                onBlur={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_BUYINGPRICE,
                    payload: e.target.value,
                  })
                }
                placeholder="Initial Price"
                className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
                required
              />
            </div>
          </div>
          <div className="flex md:justify-between justify-center items-center md:flex-row flex-col gap-2 md:mb-4 mb-4">
            <div className="md:mb-0 mb-4">
              <label htmlFor="price" className="sr-only">
                Final Price
              </label>
              <input
                type="text"
                name="sellingPrice"
                id="sellingPrice"
                value={state.sellingPrice}
                onChange={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_SELLINGPRICE,
                    payload: e.target.value,
                  })
                }
                placeholder="Final Price"
                className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
                required
              />
            </div>
            <div className="md:mb-0 mb-4">
              <label htmlFor="inventory" className="sr-only">
                Inventory
              </label>
              <input
                type="number"
                name="inventory"
                id="inventory"
                placeholder="Inventory"
                className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
                required
              />
            </div>
          </div>
          <div className="flex md:justify-between justify-center md:items-start items-center md:flex-row flex-col gap-2 md:mb-4 mb-4">
            <div>
              <div className="md:mb-0 mb-4">
                <label htmlFor="category" className="sr-only">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
                  required
                >
                  <option value="ELECTRONICS">ELECTRONICS</option>
                  <option value="FASHION">FASHION</option>
                  <option value="HOME">HOME</option>
                  <option value="BEAUTY">BEAUTY</option>
                  <option value="SPORTS">SPORTS</option>
                  <option value="FOOD">FOOD</option>
                  <option value="BOOKS">BOOKS</option>
                  <option value="TOYS">TOYS</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>
              <div className="md:mb-0 mb-4 pt-2">
                <label htmlFor="images">Images</label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  className="block w-72 h-10 px-2 text-lg bg-white"
                  multiple
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                className="block w-72 h-40 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
                required
              />
            </div>
          </div>
          <div className="w-full py-2 flex md:justify-end justify-center px-4">
            <button
              aria-label="Submit Product"
              className="bg-red-400 w-40 h-10 rounded-lg flex justify-center items-center"
              type="submit"
            >
              {isPending ? (
                <div className="h-10 w-10">
                  <Loader color="#000000" />
                </div>
              ) : (
                <span className="tex-white text-lg">Submit</span>
              )}
            </button>
          </div>
        </form>
      </section>
    </Transition>
  );
};

export default ProductForm;
