const NoProducts = () => {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: "calc(100vh - 14rem)" }}
    >
      <div>
        <h2 className="text-center text-2xl font-bold">No Products Found</h2>
        <p className="text-center">Create new product to sell</p>
      </div>
    </div>
  );
};

export default NoProducts;
