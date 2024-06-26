const PageLoader = () => {
  return (
    <section
      className="w-screen flex justify-center items-center height-mb lg:height-lg md:height-md lg:mt-20 mt-12 md:mt-14"
      style={{ height: "calc(100vh - 3.5rem)" }}
    >
      <div className="w-full">
        <div className="w-full flex justify-center items-center">
          <div
            aria-label="Loading icon"
            className="h-10 w-10 border-black border-t-2 border-r-2 border-l-2 rounded-full animate-spin"
          ></div>
        </div>
        <div className="flex justify-center w-full">
          <p>Loading</p>
        </div>
      </div>
    </section>
  );
};

export default PageLoader;
