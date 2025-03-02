import { useNavigate } from "react-router-dom";

interface Props {
  initial: string;
  queryStr: string;
}

export default function OrdersStatusForm({ initial, queryStr }: Props) {
  const navigate = useNavigate();

  return (
    <form>
      <select
        aria-label="Filter orders by status"
        value={initial}
        onChange={(e) => {
          navigate(`?page=1&query=${queryStr}&status=${e.currentTarget.value}`);
        }}
        onBlur={(e) => {
          navigate(`?page=1&query=${queryStr}&status=${e.currentTarget.value}`);
        }}
        className="block w-40 h-10 border border-black/25 focus:border focus:border-black/25 md:mx-0 mx-auto"
      >
        <option value="">All</option>
        <option value="PENDING">PENDING</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="READY">READY</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>
    </form>
  );
}
