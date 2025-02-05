import { apiHost, apiProtocol } from "../../utils/generics";
import { formatDate } from "../../utils/date";
import PhoneIcon from "../../components/icons/phone";
import { Seller } from "../../utils/types";
import SellerNavigation from "./navigation";
import EmailIcon from "../../components/icons/email";
import LocationPinIcon from "../../components/icons/pin";

interface Props {
  seller: Seller;
}

const SellersLayout = ({ seller }: Props) => {
  return (
    <div>
      <section className="flex md:flex-row flex-col md:justify-evenly justify-center md:items-start items-center pt-10">
        <div>
          <img
            src={
              seller.image
                ? `${apiProtocol}://${apiHost}/${seller.image.url}`
                : "/images/profile.svg"
            }
            alt={seller.name}
            className="w-40 h-40"
          />
        </div>
        <div>
          <div className="pb-2">
            <h3 className="font-semibold text-xl">{seller.name}</h3>
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <div className="flex justify-start items-center gap-4">
                <a href={`mailto:${seller.email}`} target="_blank">
                  <div className="w-8 h-8 bg-black text-white rounded-full p-1">
                    <EmailIcon />
                  </div>
                </a>
                <p>Email</p>
              </div>
            </li>
            <li>
              <div className="flex justify-start items-center gap-4">
                {seller.phone ? (
                  <a href={`tel:${seller.phone}`} target="_blank">
                    <div className="w-8 h-8 bg-black text-white rounded-full p-1">
                      <PhoneIcon />
                    </div>
                  </a>
                ) : (
                  <div className="w-8 h-8 bg-black text-white rounded-full p-1">
                    <PhoneIcon />
                  </div>
                )}
                <p>Phone</p>
              </div>
            </li>
            <li>
              <div className="flex justify-start items-center gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full p-1">
                  <LocationPinIcon />
                </div>
                <p>{seller.address ? seller.address : "Not provided"}</p>
              </div>
            </li>
          </ul>
          <div className="pt-2">
            <p>{formatDate(seller.createdAt)}</p>
          </div>
        </div>
      </section>
      <div className="pt-4">
        <SellerNavigation sellerID={seller.id} />
      </div>
    </div>
  );
};

export default SellersLayout;
