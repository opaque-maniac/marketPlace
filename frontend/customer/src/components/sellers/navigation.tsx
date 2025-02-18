import { Link, useLocation } from "react-router-dom";

interface Props {
  sellerID: string;
}

export default function SellerNavigation({ sellerID }: Props) {
  const { pathname } = useLocation();

  return (
    <section className="py-2 border-b">
      <nav>
        <ul className="flex justify-evenly items-center text-lg">
          <li>
            <Link
              className={
                pathname === `/sellers/${sellerID}`
                  ? "underline font-semibold"
                  : ""
              }
              to={`/sellers/${sellerID}`}
            >
              Bio
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname === `/sellers/${sellerID}/products`
                  ? "underline font-semibold"
                  : ""
              }
              to={`/sellers/${sellerID}/products`}
            >
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
