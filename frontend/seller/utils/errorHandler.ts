import { redirect } from "next/navigation";
import { ErrorObj } from "./types";

export const authErrorHandler = (error: string) => {
  if (error === "Token expired") {
    redirect("/token-expired");
  } else {
    redirect("/logout");
  }
};

export const serverErrorHandler = (error: string) => {};
