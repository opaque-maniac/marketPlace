import { useQuery } from "@tanstack/react-query";
import Loader from "./loader";
import { useContext, useState } from "react";
import { fetchProfileMisconducts } from "../utils/queries/fetchprofilemisconducts";
import RadioInput from "./misconduct-inputfield";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ShowErrorContext } from "../utils/errorContext";
import { errorHandler } from "../utils/errorHandler";

interface Props {
  id: string;
  role: "customer" | "staff" | "seller";
  disable: boolean;
}

export default function FetchMisconductsInputValues({
  id,
  role,
  disable,
}: Props) {
  const navigate = useNavigate();
  const [, setErr] = useContext(ShowErrorContext);
  const [, setError] = useContext(ErrorContext);
  const [selected, setSelected] = useState<number>(1);

  const { isLoading, isError, error, data, isSuccess } = useQuery({
    queryFn: fetchProfileMisconducts,
    queryKey: [
      "profile-misconducts",
      id,
      1,
      14,
      disable ? "DISABLE_PROFILE" : "DELETE_PROFILE",
      role,
    ],
  });

  if (isError) {
    errorHandler(error, navigate, setErr, setError);
  }

  if (isSuccess && !data) {
    navigate("/404", { replace: true });
  }

  const misconducts = data?.misconducts || [];

  return (
    <div className="min-h-[300px] xl:w-[350px] md:w-[400px] w-[340px]">
      {isLoading ? (
        <div className="h-[300px] md:w-[400px] w-[340px] mx-auto flex justify-center items-center">
          <div className="w-6 h-6">
            <Loader color="#000" />
          </div>
        </div>
      ) : (
        <div>
          {misconducts.length === 0 ? (
            <div className="h-[300px] xl:w-[350px] md:w-[400px] w-[340px] mx-auto flex justify-center items-center">
              <p>
                No misconducts found for {disable ? "disabling" : "deletion"} of
                profile
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {misconducts.map((misconduct, idx) => (
                <li key={misconduct.id}>
                  <RadioInput
                    misconduct={misconduct}
                    index={idx + 1}
                    current={selected}
                    setSelected={(n) => setSelected(n)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
