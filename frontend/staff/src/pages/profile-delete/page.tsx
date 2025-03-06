import Transition from "../../components/transition";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import DeleteProfileConfirmButton from "../../components/profile-delete/delete-profilebutton";
import { Suspense, useEffect } from "react";
import Loader from "../../components/loader";

const Fallback = () => {
  return (
    <button
      aria-label="Loading"
      disabled
      className="flex w-40 h-10 justify-center items-center text-white bg-red-500"
    >
      <div className="w-6 h-6">
        <Loader color="#fff" />
      </div>
    </button>
  );
};

export default function DeleteProfilePage() {
  useEffect(() => {
    async function prefetch() {
      try {
        await import("../../components/profile-delete/delete-profilebutton");
      } catch (e) {
        console.log("Error prefetching button", e);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    prefetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="404 Not Found" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="h-full pt-20 relative pb-4">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">Profile Delete</span>
        </p>
        <section className="md:w-5/12 w-11/12 mx-auto mt-10 border shadow-lg shadow-gray-300 min-h-40 pt-4">
          <div className="pb-2">
            <h3 className="text-lg font-semibold text-center">
              Delete Profile
            </h3>
          </div>
          <div>
            <p className="text-center">
              Are you sure you want to delete your profile on our platform?
            </p>
          </div>
          <div className="flex md:flex-row flex-col md:justify-around justify-start items-center md:gap-0 gap-4 py-4">
            <Link
              to={"/settings"}
              aria-label="Go back to settings"
              className="flex w-40 h-10 justify-center items-center text-white bg-green-500"
            >
              <span>Cancel</span>
            </Link>
            <Suspense fallback={<Fallback />}>
              <DeleteProfileConfirmButton />
            </Suspense>
          </div>
        </section>
      </main>
    </Transition>
  );
}
