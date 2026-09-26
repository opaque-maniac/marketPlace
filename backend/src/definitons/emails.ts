import { ErrorResponse } from "resend";

export type EmailType =
  | "verify-email"
  | "verify-email-staff"
  | "onboarding-verification"
  | "verify-device"
  | "reset-password"
  | "change-email"
  | "change-password"
  | "welcome";

export interface EmailResponse {
  success: boolean;
  id: string | undefined;
  error: ErrorResponse | null;
}

export type EmailTemplateData = {
  [k: string]: string;
};
