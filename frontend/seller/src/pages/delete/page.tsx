import { Link, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { Helmet } from "react-helmet";

const DeleteProductPage = () => {
  const { id } = useParams();

  return (
    <Transition>
      <Helmet>
        <title>Delete Product</title>
        <meta name="description" content="Delete a product" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <h2>Are you sure you want to delete the product</h2>
        <section>
          <button aria-label="Delete Product">Delete</button>
          <Link to={`/${id}`}>Cancel</Link>
        </section>
      </main>
    </Transition>
  );
};

export default DeleteProductPage;
