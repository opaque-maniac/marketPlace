import { Helmet } from "react-helmet";
import Transition from "../../components/transition";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../../components/loader";

const NewProductForm = lazy(() => import("../../components/new-product/form"));

const Fallback = () => {
  return (
    <div
      aria-label="Loading"
      className="xl:w-7/12 lg:w-8/12 md:w-10/12 w-11/12 h-[380px] flex justify-center items-center mx-auto"
    >
      <div className="w-8 h-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

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

      <main role="main" className="h-full relative pt-8">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">New Product</span>
        </p>
        <div className="h-12"></div>
        <section className="md:flex justify-start items-center">
          <Suspense fallback={<Fallback />}>
            <NewProductForm />
          </Suspense>
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
