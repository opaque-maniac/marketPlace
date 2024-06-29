import { useQuery } from "@tanstack/react-query";
import { useLoggedInStore } from "../../utils/store";
import fetchProfile from "./fetchProfile";
import Loader from "../../components/loader";
import { useContext, useEffect } from "react";
import ErrorContext from "../../utils/errorContext";
import { Link, useNavigate } from "react-router-dom";
import { SellerResponse } from "./pageTypes";

const ProfilePage = () => {
  const user = useLoggedInStore((state) => state.user);
  const query = useQuery(["profile", user], fetchProfile);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/error/404");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (query.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (query.isError) {
    setError(true);
    navigate("/error/500", { replace: true });
  }

  const data = query.data as SellerResponse;

  return (
    <section>
      <h2 className="text-center font-bold text-2xl mb-4 pt-4">
        {data.seller.storeName}
      </h2>
      <div className="md:flex justify-center items-center gap-6">
        <div>
          <img
            src={
              data.seller.image?.imageUrl ?? "/images/profile_placeholder.jpg"
            }
            alt={`${data.seller.storeName} logo`}
            className="w-80 h-80 rounded-full md:mx-0 mx-auto"
          />
        </div>
        <div className="md:block flex justify-center items-center md:mt-0 mt-4">
          <div>
            <p>
              Store Name: <span>{data.seller.storeName}</span>
            </p>
            <p>
              Email: <span>{data.seller.email}</span>
            </p>
            <p>
              First Name: <span>{data.seller.firstName ?? "None"}</span>
            </p>
            <p>
              Last Name: <span>{data.seller.lastName ?? "None"}</span>
            </p>
            <p>
              Address: <span>{data.seller.address ?? "None"}</span>
            </p>
            <p>
              City: <span>{data.seller.city ?? "None"}</span>
            </p>
            <p>
              Country: <span>{data.seller.country ?? "None"}</span>
            </p>
            <p>
              Phone: <span>{data.seller.phone ?? "None"}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center items-center gap-8">
        <Link
          to={`/profile/${data.seller.id}/edit`}
          className="md:no-underline md:hover:underline underline"
        >
          Edit Profile
        </Link>
        <Link
          to={`/profile/${data.seller.id}/delete`}
          className="md:no-underline md:hover:underline underline"
        >
          Delete Profile
        </Link>
      </div>
    </section>
  );
};

export default ProfilePage;
