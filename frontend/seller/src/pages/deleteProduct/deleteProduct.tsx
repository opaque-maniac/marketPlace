import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import sendDeleteProduct from "./sendDeleteRequest";
import { MouseEventHandler } from "react";
import Loader from "../../components/loader";

const DeleteProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendDeleteProduct,
    onSuccess: () => {
      navigate("/products");
    },
    onError: (error: { message: string }) => {
      console.log(error);
    },
  });

  if (mutation.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (id) {
      mutation.mutate(id);
    } else {
      navigate("/error/404", { replace: true });
    }
  };

  return (
    <section
      style={{ height: "calc(100vh - 4.5rem)" }}
      className="flex justify-center text-center items-center"
    >
      <div className=" md:w-800 w-11/12 border p-8 rounded shadow-lg">
        <h1 className="text-2xl">Delete Product</h1>
        <p>
          Are you sure you want to delete product with id:{" "}
          <span className="font-bold">{id}</span>?
        </p>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handleClick}
            className=" bg-red-400 w-40 h-10 rounded shadow-lg ml-4 hover:bg-red-500 focus:outline-none focus:bg-red-400 hover:text-white text-black transition duration-300 ease-in-out flex justify-center items-center gap-2"
          >
            Delete
          </button>
          <Link
            to={id ? `/products/${id}` : "/products"}
            className=" bg-green-400 w-40 h-10 rounded shadow-lg ml-4 hover:bg-green-500 focus:outline-none focus:bg-green-400 hover:text-white text-black transition duration-300 ease-in-out flex justify-center items-center gap-2"
          >
            Cancel
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeleteProductPage;
