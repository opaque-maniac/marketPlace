import { useState } from "react";
import { Customer, Seller, Staff } from "../../utils/types";
import { MouseEvent } from "react";
import { formatDate } from "../../utils/date";
import { Link } from "react-router-dom";
import { apiHost, apiProtocol } from "../../utils/generics";

interface Props {
  customer: Customer | null;
  seller: Seller | null;
  staff: Staff | null;
  userEmail: string;
}

interface MisconductProfileTabsProps {
  profileType: ProfileType;
  setProfileType: (type: ProfileType) => void;
  isCustomer: boolean;
  isSeller: boolean;
  isStaff: boolean;
}

interface MisconductDetailsProps extends Props {
  profileType: ProfileType;
}

type ProfileType = "customer" | "seller" | "staff";

function MisconductTabsNavigation({
  profileType,
  setProfileType,
  isCustomer,
  isSeller,
  isStaff,
}: MisconductProfileTabsProps) {
  const onClick = (e: MouseEvent<HTMLButtonElement>, type: ProfileType) => {
    e.preventDefault();
    setProfileType(type);
  };

  const types: ProfileType[] = ["customer", "seller", "staff"];

  return (
    <nav className="w-full h-[35px]">
      <ul className="flex justify-start items-end h-full">
        {types.map((type, idx) => {
          if (type === "customer" && !isCustomer) return null;
          if (type === "seller" && !isSeller) return null;
          if (type === "staff" && !isStaff) return null;

          return (
            <li key={idx}>
              <button
                onClick={(e) => onClick(e, type)}
                className={`h-[30px] border-l border-t border-r border-black border-collapse w-[100px] ${
                  profileType === type
                    ? "bg-black text-white h-[32px] text-base rounded-tr-lg"
                    : "text-sm rounded-tr-3xl"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MisconductDetails({
  customer,
  seller,
  staff,
  userEmail,
  profileType,
}: MisconductDetailsProps) {
  function MisconductData({ profileType }: { profileType: ProfileType }) {
    const name =
      profileType === "customer"
        ? `${customer?.firstName} ${customer?.lastName}`
        : profileType === "seller"
          ? seller?.name
          : `${staff?.firstName} ${staff?.lastName}`;
    const date =
      profileType === "customer"
        ? customer?.createdAt
        : profileType === "seller"
          ? seller?.createdAt
          : staff?.createdAt;
    const email =
      profileType === "customer"
        ? customer?.email
        : profileType === "seller"
          ? seller?.email
          : staff?.email;
    const link =
      profileType === "customer"
        ? `/customers/${customer?.id}`
        : profileType === "seller"
          ? `/sellers/${seller?.id}`
          : `/staff/${staff?.id}`;
    const image =
      profileType === "staff"
        ? staff?.image?.url
        : profileType === "customer"
          ? customer?.image?.url
          : staff?.image?.url;
    const active =
      profileType === "customer"
        ? customer?.active
        : profileType === "seller"
          ? seller?.active
          : profileType === "staff"
            ? staff?.active
            : false;

    return (
      <div className="h-full flex md:flex-row flex-col items-center md:justify-center justify-start md:gap-4">
        <div className="md:order-1 order-2">
          <h3>{email}</h3>
          <p>{name}</p>
          <p>
            Active: <span>{active ? "Yes" : "No"}</span>
          </p>
          {profileType === "staff" && (
            <p>
              Role: <span>{staff?.role}</span>
            </p>
          )}
          <p>{date && formatDate(date)}</p>
          <Link
            className="underline text-blue-500 text-sm"
            to={link}
            target="_blank"
          >
            View profile
          </Link>
        </div>
        <div>
          <img
            src={
              image
                ? `${apiProtocol}://${apiHost}/${image}`
                : "/images/profile.svg"
            }
            alt={name}
            className="w-40 h-40 border border-black/50 rounded-full"
          />
        </div>
      </div>
    );
  }

  // wrapper
  return (
    <div className="border border-black h-[365px] md:pt-0 pt-4">
      {profileType === "customer" && customer ? (
        <MisconductData profileType="customer" />
      ) : profileType === "seller" && seller ? (
        <MisconductData profileType="seller" />
      ) : profileType === "staff" && staff ? (
        <MisconductData profileType="staff" />
      ) : (
        <div className="h-full flex justify-center items-center">
          <p className="text-center">
            No {!customer && !seller && !staff ? "" : profileType} profile found
            with email <span className="">{userEmail} </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default function MiscconductProfileTabs({
  customer,
  seller,
  staff,
  userEmail,
}: Props) {
  const [profileType, setProfileType] = useState<ProfileType>("customer");

  const callback = (type: ProfileType) => {
    setProfileType(type);
  };

  return (
    <section className="xl:w-5/12 md:w-7/12 w-11/12 h-[400px]">
      <div>
        <MisconductTabsNavigation
          profileType={profileType}
          setProfileType={callback}
          isCustomer={!!customer}
          isSeller={!!seller}
          isStaff={!!staff}
        />
        <MisconductDetails
          customer={customer}
          seller={seller}
          staff={staff}
          userEmail={userEmail}
          profileType={profileType}
        />
      </div>
    </section>
  );
}
