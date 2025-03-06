import { useMutation } from "@tanstack/react-query";
import Loader from "../loader";
import { useNavigate } from "react-router-dom";
import { FormEventHandler, useContext } from "react";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";
import { sendUpdateProduct } from "../../utils/mutations/products/updateproduct";
import { Product } from "../../utils/types";
import useProductForm from "../../utils/reducers/useProductForm";

interface Props {
  product: Product;
}

export default function UpdateProductForm({ product }: Props) {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const { isPending, mutate } = useMutation({
    mutationFn: sendUpdateProduct,
    onSuccess: () => {
      navigate(`/products/${product.id}`, { replace: true });
    },
    onError: (error) => {
      errorHandler(error, navigate, setErr, setError);
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate({ data: formData, id: product.id });
  };

  const { state, dispatch, ActionType } = useProductForm(product);

  return (
    <form
      onSubmit={submitHandler}
      className="xl:w-7/12 lg:w-8/12 md:w-10/12 w-11/12 mx-auto shadow-xl border rounded-lg py-2 lg:px-6 md:px-4 h-[380px]"
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
            placeholder="Name"
            className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            required
            value={state.name}
            onChange={(e) =>
              dispatch({
                type: ActionType.CHANGE_NAME,
                payload: e.currentTarget.value,
              })
            }
            onBlur={(e) =>
              dispatch({
                type: ActionType.CHANGE_NAME,
                payload: e.currentTarget.value,
              })
            }
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
            placeholder="Initial Price"
            className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            required
            value={state.buyingPrice}
            onChange={(e) =>
              dispatch({
                type: ActionType.CHANGE_BUYINGPRICE,
                payload: e.currentTarget.value,
              })
            }
            onBlur={(e) =>
              dispatch({
                type: ActionType.CHANGE_BUYINGPRICE,
                payload: e.currentTarget.value,
              })
            }
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
            placeholder="Final Price"
            className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
            required
            value={state.sellingPrice}
            onChange={(e) =>
              dispatch({
                type: ActionType.CHANGE_SELLINGPRICE,
                payload: e.currentTarget.value,
              })
            }
            onBlur={(e) =>
              dispatch({
                type: ActionType.CHANGE_SELLINGPRICE,
                payload: e.currentTarget.value,
              })
            }
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
            value={state.inventory}
            onChange={(e) =>
              dispatch({
                type: ActionType.UPDATE_INVENTORY,
                payload: e.currentTarget.value,
              })
            }
            onBlur={(e) =>
              dispatch({
                type: ActionType.UPDATE_INVENTORY,
                payload: e.currentTarget.value,
              })
            }
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
              value={state.category}
              onChange={(e) =>
                dispatch({
                  type: ActionType.CHANGE_CATEGORY,
                  payload: e.currentTarget.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: ActionType.CHANGE_CATEGORY,
                  payload: e.currentTarget.value,
                })
              }
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
            value={state.description}
            onChange={(e) =>
              dispatch({
                type: ActionType.CHANGE_DESCRIPTION,
                payload: e.currentTarget.value,
              })
            }
            onBlur={(e) =>
              dispatch({
                type: ActionType.CHANGE_DESCRIPTION,
                payload: e.currentTarget.value,
              })
            }
          />
        </div>
      </div>
      <div className="w-full py-2 flex md:justify-end justify-center px-4">
        <button
          aria-label="Submit Product"
          className="bg-red-400 w-40 h-10 rounded-lg flex justify-center items-center text-white"
          type="submit"
        >
          {isPending ? (
            <div className="h-6 w-6">
              <Loader color="#fff" />
            </div>
          ) : (
            <span className="tex-white text-lg">Submit</span>
          )}
        </button>
      </div>
    </form>
  );
}
