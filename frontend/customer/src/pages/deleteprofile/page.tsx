import { Helmet } from "react-helmet";
import Transition from "../../components/transition";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

const DeleteProfilePage = () => {
  const navigate = useNavigate();

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <Transition>
      <Helmet>
        <title>Delete Profile</title>
        <meta name="description" content="Delete a product" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-20 relative pb-6">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Delete Profile</span>
        </p>

        <section
          className="md:flex justify-center items-center shadow-xl border rounded-lg lg:w-8/12 mx-auto w-10/12"
          style={{
            minHeight: "calc(100vh - 14rem)",
          }}
        >
          <div>
            <h2 className="text-center text-2xl md:pb-0 pb-4 mb-6 md:pt-0 pt-4">
              Are you sure you want to delete your profile
            </h2>
            <div className="flex md:justify-around justify-center items-center md:flex-row flex-col md:gap-0 gap-4">
              <button
                className="block h-10 w-40 rounded-lg bg-red-400 md:mb-0 mb-8"
                aria-label="Delete Product"
              >
                Delete
              </button>
              <button
                onClick={handleCancel}
                aria-label="Back To Product Page"
                className="block h-10 w-40 rounded-lg bg-green-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default DeleteProfilePage;
