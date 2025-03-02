import { Link } from "react-router-dom";
import { Staff } from "../../utils/types";
import TickIcon from "../icons/tick";
import CloseIcon from "../icons/closeIcon";
import { formatDate } from "../../utils/date";
import { apiHost, apiProtocol } from "../../utils/generics";

interface Props {
  staff: Staff;
}

export default function StaffItem({ staff }: Props) {
  return (
    <Link to={`/staff/${staff.id}`} className="block h-350 w-270 border pt-1">
      <div>
        <div className="h-200 w-170 bg-gray-500 mx-auto">
          <img
            src={
              staff.image
                ? `${apiProtocol}://${apiHost}/${staff.image.url}`
                : "/images/profile.svg"
            }
            alt={`${staff.firstName} ${staff.lastName}`}
            className="h-full w-full"
          />
        </div>
        <div className="w-full text-center pt-4">
          <p className="font-semibold">{staff.email}</p>
          <p>
            {staff.firstName} {staff.lastName}
          </p>
          <div className="flex justify-center items-center gap-[5px]">
            <p>Active: </p>
            <div
              className={`w-5 h-5 border rounded-full p-[2px] ${staff.active ? "text-green-500 border-green-500" : "text-red-500 border-red-500"}`}
            >
              {staff.active ? <TickIcon /> : <CloseIcon />}
            </div>
          </div>
          <div>
            <p>{formatDate(staff.createdAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
