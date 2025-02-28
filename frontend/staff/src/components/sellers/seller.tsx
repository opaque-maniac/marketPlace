import { Link } from "react-router-dom";
import { Seller } from "../../utils/types";
import TickIcon from "../icons/tick";
import CloseIcon from "../icons/closeIcon";
import { formatDate } from "../../utils/date";
import { apiHost, apiProtocol } from "../../utils/generics";

interface Props {
  seller: Seller;
}

export default function SellerItem({ seller }: Props) {
  return (
    <Link to={`/seller/${seller.id}`} className="block h-350 w-270 border pt-1">
      <div>
        <div className="h-200 w-170 bg-gray-500 mx-auto">
          <img
            src={
              seller.image
                ? `${apiProtocol}://${apiHost}/${seller.image.url}`
                : "/images/profile.svg"
            }
            alt={seller.name}
            className="h-full w-full"
          />
        </div>
        <div className="w-full text-center pt-4">
          <p className="font-semibold">{seller.email}</p>
          <p>{seller.name}</p>
          <div className="flex justify-center items-center gap-[5px]">
            <p>Active: </p>
            <div
              className={`w-5 h-5 border rounded-full p-[2px] ${seller.active ? "text-green-500 border-green-500" : "text-red-500 border-red-500"}`}
            >
              {seller.active ? <TickIcon /> : <CloseIcon />}
            </div>
          </div>
          <div>
            <p>{formatDate(seller.createdAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
