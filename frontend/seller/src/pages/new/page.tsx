import { Helmet } from "react-helmet";
import Transition from "../../components/transition";
import { Link } from "react-router-dom";

const NewProductPage = () => {
  return (
    <Transition>
      <Helmet>
        <title>New Product</title>
        <meta name="description" content="Add a new product" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <div className="pt-4">
          <h2 className="text-center text-3xl md:pb-0 pb-4">New Product</h2>
        </div>
        <section
          className="md:flex justify-center items-center"
          style={{
            minHeight: "calc(100vh - 14rem)",
          }}
        >
          <form className="lg:w-7/12 md:w-10/12 w-11/12 mx-auto shadow-xl lg:px-2">
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
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="price"
                  className="block w-72 h-12 px-2 text-lg auth-input focus:auth-input focus:outline-none bg-white"
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
                className="bg-red-400 tex-white text-lg text-center w-40 h-10 rounded-lg"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
        <div className="flex justify-center items-center md:py-0 py-6">
          <Link className="underline" to="/">
            Go back to home
          </Link>
        </div>
      </main>
    </Transition>
  );
};

export default NewProductPage;
