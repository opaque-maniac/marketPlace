import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { ErrorResponse } from "./types";
import { removeAccessToken, removeRefreshToken, removeUserID } from "./cookies";
import { logoutFunction } from "./logout";

const logout: string[] = ["A001", "PR02", "A003"];
const logoutAndMessage = ["A002", "A006"];
const errors404 = [
  "C002",
  "P001",
  "CM01",
  "OR01",
  "SE01",
  "W002",
  "CU01",
  "CU02",
  "ST01",
  "A005",
  "CU03",
  "PR03",
];
const errors500 = ["SE02", "W001", "S001"];
const messageErrors = ["PR01", "I001", "I002", "C003", "OR02"];
const messageAnd500 = ["C001"];
const refreshError = ["A004"];

export function errorHandler(
  error: unknown,
  navigate: NavigateFunction,
  setErr: Dispatch<SetStateAction<string | null>>,
  setError: Dispatch<SetStateAction<boolean>>,
) {
  if (error instanceof Error) {
    try {
      const { errorCode, message } = JSON.parse(error.message) as ErrorResponse;

      switch (true) {
        case logout.includes(errorCode):
          logoutFunction(navigate);
          break;
        case logoutAndMessage.includes(errorCode):
          setErr(message);
          navigate("/logout", { replace: true });
          break;
        case errors404.includes(errorCode):
          navigate("/404");
          break;
        case errors500.includes(errorCode):
          setError(true);
          navigate("/500", { replace: true });
          break;
        case messageErrors.includes(errorCode):
          setErr(message);
          break;
        case messageAnd500.includes(errorCode):
          setErr(message);
          navigate("/500", { replace: true });
          break;
        case refreshError.includes(errorCode):
          navigate("/refresh");
          break;
        default:
          setErr("Something unexpected happened");
          break;
      }
    } catch (e) {
      setError(true);
      navigate("/500", { replace: true });
    }
  } else {
    setErr("Something unexpected happened");
  }
}
