import { Link, useParams } from "react-router-dom";
import Transition from "../../components/transition";
import { Helmet } from "react-helmet";

const EditProductPage = () => {
  const { id } = useParams();

  return (
    <Transition>
      <Helmet>
        <title>Edit Product</title>
        <meta name="description" content="Edit a product" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="google" content="nositelinkssearchbox" />
      </Helmet>
      <main role="main">
        <h2>Edit the product</h2>
        <section>{/** Form to edit */}</section>
        <div>
          <Link to={`/${id}`}>Cancel</Link>
        </div>
      </main>
    </Transition>
  );
};

export default EditProductPage;
