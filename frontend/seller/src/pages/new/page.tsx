import { Helmet } from "react-helmet";
import Transition from "../../components/transition";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { sendNewProduct } from "../../utils/mutations/products/newproduct";
import { FormEventHandler, useContext } from "react";
import Loader from "../../components/loader";
import { ErrorContext, ShowErrorContext } from "../../utils/errorContext";
import { errorHandler } from "../../utils/errorHandler";

const NewProductPage = () => {
  const navigate = useNavigate();
  const [, setError] = useContext(ErrorContext);
  const [, setErr] = useContext(ShowErrorContext);

  const mutation = useMutation({
    mutationFn: sendNewProduct,
    onSuccess: (data) => {
      if (data) {
        navigate(`/products/${data.product.id}`, { replace: true });
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
    mutation.mutate({ data: formData });
  };

  return (
    <Transition>
      <Helmet>
        <title>New Product</title>
        <meta name="description" content="Add a new product" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>

      <main role="main" className="h-full relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">New Product</span>
        </p>
        <div className="h-12"></div>
        <section className="md:flex justify-start items-center">
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
                {mutation.isPending ? (
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
        <div className="flex justify-center items-center pt-6 md:pb-0 pb-4">
          <Link className="underline" to="/">
            Go back to home
          </Link>
        </div>
      </main>
    </Transition>
  );
};

export default NewProductPage;
