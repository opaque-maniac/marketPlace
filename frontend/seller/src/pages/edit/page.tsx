import { Link, useParams } from "react-router-dom";
import Transition from "../../components/transition";

const EditProductPage = () => {
  const { id } = useParams();

  return (
    <Transition>
      <main>
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
