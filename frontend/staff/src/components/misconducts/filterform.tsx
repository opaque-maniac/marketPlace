import { useNavigate } from "react-router-dom";

interface Props {
  initial: string;
  queryStr: string;
}

export default function MisconductsFilterForm({ initial, queryStr }: Props) {
  const navigate = useNavigate();

  return (
    <form>
      <select
        value={initial}
        onBlur={(e) => {
          navigate(`?page=1&query=${queryStr}&action=${e.currentTarget.value}`);
        }}
        onChange={(e) => {
          navigate(`?page=1&query=${queryStr}&action=${e.currentTarget.value}`);
        }}
        aria-label="Filter orders by status"
        className="block w-40 h-10 border border-black/25 focus:border focus:border-black/25 md:mx-0 mx-auto"
      >
        <option value="">All</option>
        <option value="WARN_USER">WARN USER</option>
        <option value="DISABLE_PROFILE">DISABLE PROFILE</option>
        <option value="DELETE_PROFILE">DELETE PROFILE</option>
      </select>
    </form>
  );
}
