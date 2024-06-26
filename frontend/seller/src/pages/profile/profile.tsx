import { useQuery } from "@tanstack/react-query";
import { useLoggedInStore } from "../../utils/store";
import fetchProfile from "./fetchProfile";
import Loader from "../../components/loader";
import { useContext } from "react";
import ErrorContext from "../../utils/errorContext";
import { useNavigate } from "react-router-dom";
import { SellerResponse } from "./pageTypes";

const ProfilePage = () => {
  const user = useLoggedInStore((state) => state.user);
  const query = useQuery(["profile", user], fetchProfile);
  const [, setError] = useContext(ErrorContext);
  const navigate = useNavigate();

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
      <h2>{data.seller.storeName}</h2>
      <div>
        <img
          src={data.seller.image?.imageUrl ?? "/placeholder.png"}
          alt={`${data.seller.storeName} logo`}
        />
      </div>
      <div>
        <p>Store Name: {data.seller.storeName}</p>
        <p>Email: {data.seller.email}</p>
        <p>First Name: {data.seller.firstName ?? "None"}</p>
        <p>Last Name: {data.seller.lastName ?? "None"}</p>
      </div>
    </section>
  );
};

export default ProfilePage;
