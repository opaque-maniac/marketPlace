import { Complaint } from "../../utils/types";

interface Props {
  complaint: Complaint;
}

export default function Complaint({ complaint }: Props) {
  return <div>{complaint.message}</div>;
}
