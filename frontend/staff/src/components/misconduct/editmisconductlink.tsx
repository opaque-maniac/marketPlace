import { Link } from "react-router-dom";
import useUserStore from "../../utils/store";

interface Props {
  id: string;
  staffID: string | null;
}

export default function EditMisconductLink({ id, staffID }: Props) {
  const user = useUserStore((state) => state.user);

  return user === staffID ? (
    <button
      disabled
      aria-label="Cannot edit own misconduct"
      className="flex justify-center items-center bg-blue-500 text-white h-10 w-36 rounded-md"
    >
      <span>Edit Misconduct</span>
    </button>
  ) : (
    <Link
      to={`/misconducts/${id}/edit`}
      className="flex justify-center items-center bg-blue-500 text-white h-10 w-36 rounded-md"
    >
      Edit Misconduct
    </Link>
  );
}
