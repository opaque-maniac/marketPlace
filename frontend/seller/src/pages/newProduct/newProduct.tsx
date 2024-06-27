import NewProductForm from "./components/newProductForm";

const NewProductPage = () => {
  return (
    <section>
      <h2 className="text-center text-2xl font-bold md:pt-2">New Product</h2>
      <div>
        <NewProductForm />
      </div>
    </section>
  );
};

export default NewProductPage;
