import { useMutation } from "@tanstack/react-query";
import { FormEventHandler } from "react";
import submitNewProduct from "./submitNewProduct";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader";

const NewProductForm = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: submitNewProduct,
    onSuccess: (data) => {
      if (data.product) {
        navigate(`/products/${data.product.id}`, { replace: true });
      }
    },
    onError: (error: { message: string }) => {
      console.log(error);
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  if (mutation.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto md:w-800 border border-gray-400 mt-4 p-4 rounded-lg shadow-lg"
    >
      <div className="md:flex justify-center items-center gap-8 md:mb-4">
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="sr-only">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Product Name"
              required
              className="block md:w-64 md:mx-0 w-11/12 mx-auto px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-transparent h-12"
            />
          </div>
          <div className="md:mb-0 mb-4">
            <label htmlFor="price" className="sr-only">
              Product Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Product Price"
              required
              className="block md:w-64 md:mx-0 w-11/12 mx-auto px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-transparent h-12"
            />
          </div>
        </div>
        <div className="md:mb-0 mb-4">
          <label htmlFor="description" className="sr-only">
            Product Descritpion
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Product Description"
            required
            className="block md:w-64 md:mx-0 w-11/12 mx-auto px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-transparent h-28"
          />
        </div>
      </div>
      <div className="md:flex justify-center items-center gap-8 md:mb-4 md:mt-8">
        <div>
          <div className="md:mb-4 mb-4">
            <label htmlFor="stock" className="sr-only">
              Product Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="Product Stock"
              required
              className="block md:w-64 md:mx-0 w-11/12 mx-auto px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-transparent h-10"
            />
          </div>
          <div className="md:mb-0 mb-4">
            <label htmlFor="category" className="sr-only">
              Product Category
            </label>
            <select
              name="category"
              id="category"
              required
              className="block md:w-64 md:mx-0 w-11/12 mx-auto px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-transparent h-10"
            >
              <option value="ELECTRONICS">ELECTRONICS</option>
              <option value="BOOKS">BOOKS</option>
              <option value="CLOTHING">CLOTHING</option>
              <option value="HOME_KITCHEN">HOME & KITCHEN</option>
              <option value="BEAUTY_HEALTH">BEAUTY & HEALTH</option>
              <option value="SPORTS_OUTDOORS">SPORTS & OUTDOORS</option>
              <option value="TOYS_GAMES">TOYS & GAMES</option>
            </select>
          </div>
        </div>
        <div className="md:mb-0 mb-8">
          <label htmlFor="image" className="sr-only">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            required
            multiple
            className="block md:w-64 md:mx-0 w-11/12 mx-auto px-4 py-2 border-b-2 bg-gray-200 hover:border-gray-400 focus:bg-white focus:outline-none focus:border-transparent h-10"
          />
        </div>
      </div>
      <div className="flex justify-center items-center pt-4">
        <button
          type="submit"
          className="block w-32 h-10 bg-green-400 rounded shadow-lg ml-4 hover:bg-green-500 focus:outline-none focus:bg-green-400 hover:text-white text-black transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewProductForm;
