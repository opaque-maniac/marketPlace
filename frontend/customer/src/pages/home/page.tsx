import { Helmet } from "react-helmet";
import Transition from "../../components/transition";

const HomePage = () => {
  return (
    <Transition>
      <Helmet>
        <title>Hazina</title>
        <meta
          name="description"
          content="Hazina marketplace home page, explore an buy products in kenya"
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main" className="px-2">
        <section className="md:flex justify-start items-center gap-4 mb-32">
          <div className="md:w-5/12 h-344 md:border-r border-black"></div>
          <div className="w-full h-344 py-4">
            <div className="bg-black h-full w-full"></div>
          </div>
        </section>
        <section
          style={{ minHeight: "493px" }}
          className="border border-red-500"
        >
          <div className="flex justify-start items-center gap-4">
            <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
            <p className="text-red-400 text-xl font-bold">{`Today's`}</p>
          </div>
        </section>
        <section className="h-32 flex justify-center items-center">
          <button
            aria-label="View all products"
            className="h-14 w-56 roundend-sm bg-red-400 text-white"
          >
            View All Products
          </button>
        </section>
        <hr />
        <section className="pt-4">
          <div className="flex justify-start items-center gap-4">
            <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
            <p className="text-red-400 text-xl font-bold">Categories</p>
          </div>
          <h2 className="text-3xl font-semibold">Browser By Category</h2>
          <div className="pt-10 pb-12">
            <ul className="flex lg:justify-between justify-center lg:gap-0 gap-4 items-center border border-green-500 flex-wrap">
              <li>
                <div className="w-44 h-36 border border-black/25"></div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25"></div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25"></div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25"></div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25"></div>
              </li>
              <li>
                <div className="w-44 h-36 border border-black/25"></div>
              </li>
            </ul>
          </div>
        </section>
        <hr />
        <section
          style={{ minHeight: "518px" }}
          className="border border-orange-400 mb-32"
        >
          {" "}
          <div className="flex justify-start items-center gap-4">
            <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
            <p className="text-red-400 text-xl font-bold">Check these out</p>
          </div>
          <div className="h-20 flex md:justify-between items-center justify-center md:gap-0 gap-6 md:px-8">
            <h2 className="text-3xl font-semibold">Best Selling Products</h2>
            <button
              aria-label="View All Products"
              className="w-40 h-14 rounded-sm bg-red-400 text-white"
            >
              View All
            </button>
          </div>
        </section>
        <section
          style={{ minHeight: "500px" }}
          className="bg-black mb-32"
        ></section>
        <section
          style={{ minHeight: "900px" }}
          className="border border-yellow-500"
        ></section>
        <section className="h-32 flex justify-center items-center">
          <button
            aria-label="View all products"
            className="h-14 w-56 roundend-sm bg-red-400 text-white"
          >
            View All Products
          </button>
        </section>
        <section
          style={{ minHeight: "768px" }}
          className="border-blue-500 border"
        >
          <div className="flex justify-start items-center gap-4">
            <div className="bg-red-400 rounded-lg animate-bounce w-5 h-10"></div>
            <p className="text-red-400 text-xl font-bold">Featured</p>
          </div>
          <div className="flex justify-start items-center py-2">
            <h2 className="text-3xl font-semibold">Other Suggestions</h2>
          </div>
          <div className="md:flex justify-center gap-4 items-center">
            <div
              style={{ height: "720px" }}
              className="bg-black md:w-6/12 w-full"
            ></div>
            <div className="md:w-6/12">
              <div className="bg-red-500 mb-4 h-350"></div>
              <div className="md:flex justify-center items-center gap-4">
                <div className="bg-green-500 h-350 md:w-6/12"></div>
                <div className="bg-orange-500 h-350 md:w-6/12"></div>
              </div>
            </div>
          </div>
        </section>
        <section className="min-h-80 md:flex justify-center items-center md:py-0 py-10">
          <div className="w-full">
            <ul className="flex md:justify-evenly justify-center md:flex-row flex-col items-center md:gap-0 gap-4">
              <li>
                <div
                  style={{ width: "249px", height: "161px" }}
                  className="bg-teal-400"
                >
                  <p>One</p>
                </div>
              </li>
              <li>
                <div
                  style={{ width: "249px", height: "161px" }}
                  className="bg-teal-400"
                >
                  <p>Two</p>
                </div>
              </li>
              <li>
                <div
                  style={{ width: "249px", height: "161px" }}
                  className="bg-teal-400"
                >
                  <p>Three</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </Transition>
  );
};

export default HomePage;
