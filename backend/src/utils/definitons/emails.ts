import { ErrorResponse } from "resend";

export type EmailType =
  | "verify-email"
  | "verify-device"
  | "reset-password"
  | "change-email"
  | "change-password"
  | "welcome";


export interface EmailResponse {
  sucess: boolean
  id: string | undefined
  error: ErrorResponse | null
}

export type EmailTemplateData = {
  [k: string]: string;
};
