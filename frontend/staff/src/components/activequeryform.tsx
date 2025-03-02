import { useNavigate } from "react-router-dom";

interface Props {
  initial: string;
  queryStr: string;
  label: string;
}

export default function ProfileActiveSelectForm({
  initial,
  queryStr,
  label,
}: Props) {
  const navigate = useNavigate();

  return (
    <form>
      <select
        aria-label={`Filter ${label} by whether their profile is active`}
        value={initial}
        onChange={(e) => {
          navigate(`?page=1&query=${queryStr}&active=${e.currentTarget.value}`);
        }}
        onBlur={(e) => {
          navigate(`?page=1&query=${queryStr}&active=${e.currentTarget.value}`);
        }}
        className="block w-40 h-10 border border-black/25 focus:border focus:border-black/25 md:mx-0 mx-auto"
      >
        <option value="">All</option>
        <option value="true">ACTIVATED</option>
        <option value="false">DEACTIVATED</option>
      </select>
    </form>
  );
}
