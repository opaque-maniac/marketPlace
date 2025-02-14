import { UserAllTypes, UserRole } from "../../types";
import { verifyEmailTemplate } from "../email_templates/verify-email";
import {
  customerClientHost,
  sellerClientHost,
  serverError,
  staffClientHost,
} from "../globals";
import { generateTempToken } from "../token";
import { sendEmail } from "./email";

export const sendVerificationEmail = async (
  profile: UserAllTypes,
  role: UserRole,
  name: string,
): Promise<void> => {
  const baseUrl =
    role === "customer"
      ? customerClientHost
      : role === "seller"
        ? sellerClientHost
        : staffClientHost;

  if (!baseUrl) {
    throw serverError;
  }

  const token = generateTempToken(profile.email, role);

  const url = `${baseUrl}/verify-email/${token}`;

  const template = verifyEmailTemplate(name, url, baseUrl);

  await sendEmail(profile.email, template, "Verify Your Email");
};
