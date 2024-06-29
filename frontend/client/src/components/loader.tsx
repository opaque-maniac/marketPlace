const Loader = () => {
  return (
    <section className="w-full flex justify-center items-center h-96">
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

export default Loader;
