import { Link, useParams } from "react-router-dom";
import Transition from "../../components/transition";

const DeleteProductPage = () => {
  const { id } = useParams();

  return (
    <Transition>
      <main>
        <h2>Are you sure you want to delete the product</h2>
        <section>
          <button>Delete</button>
          <Link to={`/${id}`}>Cancel</Link>
        </section>
      </main>
    </Transition>
  );
};

export default DeleteProductPage;
