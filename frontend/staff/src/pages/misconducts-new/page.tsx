import Transition from "../../components/transition";
import { Helmet } from "react-helmet";
import Loader from "../../components/loader";
import NewMisconductForm from "../../components/new-misconducts/form";
import { Suspense } from "react";

const Fallback = () => {
  return (
    <div
      role="banner"
      className="flex justify-center items-center md:w-[450px] w-11/12 h-[450px] border pt-1"
    >
      <div className="h-8 w-8">
        <Loader color="#000" />
      </div>
    </div>
  );
};

export default function MisconductsPage() {
  return (
    <Transition>
      <Helmet>
        <title>Misconducts</title>
        <meta
          name="description"
          content="Complaints page for Hazina staff app"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="pt-12 relative">
        <p className="absolute top-4 left-4">
          {" "}
          Home / <span className="font-extrabold">New Misconduct</span>
        </p>
        <section>
          <Suspense fallback={<Fallback />}>
            <div className="md:w-[450px] w-11/12 h-[480px] py-5 border border-black/20 mx-auto md:mt-10 mt-6">
              <div>
                <h3 className="text-center text-lg font-semibold pb-4">
                  New Misconduct
                </h3>
              </div>
              <NewMisconductForm />
            </div>
          </Suspense>
        </section>
      </main>
    </Transition>
  );
}
