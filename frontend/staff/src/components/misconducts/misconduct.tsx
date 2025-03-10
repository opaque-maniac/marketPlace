import { Link, useNavigate } from "react-router-dom";
import { Misconduct } from "../../utils/types";
import { formatDate } from "../../utils/date";
import { apiHost, apiProtocol } from "../../utils/generics";
import { MouseEventHandler } from "react";

interface Props {
  misconduct: Misconduct;
}

function ProfileButton({ link, label }: { link: string; label: string }) {
  const navigate = useNavigate();

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(link);
  };

  return <button onClick={clickHandler}>{label}</button>;
}

export default function MisconductItem({ misconduct }: Props) {
  console.log(misconduct);
  return (
    <Link
      className="block px-[5px] md:h-[140px] h-[320px] pt-[5px] md:w-[450px] w-[200px] border border-black"
      to={`/misconducts/${misconduct.id}`}
    >
      <p>{misconduct.userEmail}</p>
      <div className="flex md:flex-row flex-col justify-between md:pl-0 pl-4">
        <div>
          <h3 className="font-semibold mt-[5px]">Profiles:</h3>
          {misconduct.customerID ||
          misconduct.staffID ||
          misconduct.sellerID ? (
            <ul className="text-sm pl-2">
              {misconduct.customerID && (
                <li>
                  <ProfileButton
                    link={`/customers/${misconduct.customerID}`}
                    label="Customer"
                  />
                </li>
              )}
              {misconduct.sellerID && (
                <li>
                  <ProfileButton
                    link={`/sellers/${misconduct.sellerID}`}
                    label="Seller"
                  />
                </li>
              )}
              {misconduct.staffID && (
                <li>
                  <ProfileButton
                    link={`/staff/${misconduct.customerID}`}
                    label="Staff"
                  />
                </li>
              )}
            </ul>
          ) : (
            <div className="text-sm pl-2">
              <p>No profiles found</p>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold">Personel:</h3>
          <div className="text-sm pl-2">
            <p>
              {misconduct.personel.firstName} {misconduct.personel.lastName}
            </p>
            <p>
              Action: <span>{misconduct.response.replace("_", " ")}</span>
            </p>
            <p>{formatDate(misconduct.createdAt)}</p>
          </div>
        </div>
        <div>
          <img
            src={
              misconduct.personel.image
                ? `${apiProtocol}://${apiHost}/${misconduct.personel.image.url}`
                : "/images/profile.svg"
            }
            alt={`${misconduct.personel.firstName} ${misconduct.personel.lastName}`}
            className="w-[80px] h-[80px] rounded-full overflow-hidden"
          />
        </div>
      </div>
    </Link>
  );
}
