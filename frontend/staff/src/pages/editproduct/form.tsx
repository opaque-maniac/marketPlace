import Transition from "../../components/transition";
import { Product } from "../../utils/types";
import useProductForm from "./useProductForm";
import { FormEventHandler } from "react";
import Loader from "../../components/loader";

interface Props {
  product: Product;
  handler: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}

const ProductForm = ({ product, handler, isLoading }: Props) => {
  const { state, dispatch, ActionType } = useProductForm(product);

  return (
    <Transition>
      <section
        className="md:flex justify-center items-center"
        style={{
          minHeight: "calc(100vh - 14rem)",
        }}
      >
        <form
          onSubmit={handler}
          className="lg:w-7/12 md:w-10/12 w-11/12 mx-auto shadow-xl lg:px-2"
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
                required
              />
            </div>
            <div className="md:mb-0 mb-4">
              <label htmlFor="price" className="sr-only">
                Price
              </label>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="price"
                className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
                value={state.price}
                onChange={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_PRICE,
                    payload: e.target.value,
                  })
                }
                onBlur={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_PRICE,
                    payload: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="flex md:justify-between justify-center items-center md:flex-row flex-col gap-2 md:mb-4 mb-4">
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
                value={state.inventory}
                onChange={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_INVENTORY,
                    payload: e.target.value,
                  })
                }
                onBlur={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_INVENTORY,
                    payload: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="md:mb-0 mb-4">
              <label htmlFor="category" className="sr-only">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
                value={state.category}
                onChange={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_CATEGORY,
                    payload: e.target.value,
                  })
                }
                onBlur={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_CATEGORY,
                    payload: e.target.value,
                  })
                }
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
          </div>
          <div className="flex md:justify-between justify-center items-center md:flex-row flex-col gap-2 md:mb-4 mb-4">
            <div>
              <div className="mb-8">
                <label htmlFor="discount" className="sr-only">
                  Discount
                </label>
                <input
                  type="text"
                  name="discount"
                  id="discount"
                  placeholder="Discount Percentage"
                  className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
                  value={state.discount}
                  onChange={(e) =>
                    dispatch({
                      type: ActionType.UPDATE_DISCOUNT,
                      payload: e.target.value,
                    })
                  }
                  onBlur={(e) =>
                    dispatch({
                      type: ActionType.UPDATE_DISCOUNT,
                      payload: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="md:mb-0 mb-4">
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
                value={state.description}
                onChange={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_DESCRIPTION,
                    payload: e.target.value,
                  })
                }
                onBlur={(e) =>
                  dispatch({
                    type: ActionType.UPDATE_DESCRIPTION,
                    payload: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="w-full py-2 flex md:justify-end justify-center px-4">
            <button
              aria-label="Submit Product"
              className="bg-red-400 tex-white text-lg text-center w-40 h-10 rounded-lg"
              type="submit"
            >
              {isLoading ? (
                <div className="h-full w-full flex justify-center items-center">
                  <div className="h-10 w-10">
                    <Loader color="#000000" />
                  </div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </section>
    </Transition>
  );
};

export default ProductForm;
