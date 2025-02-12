import { changeEmailTemplate } from "../email_templates/change-email";
import { serverError } from "../globals";
import { sendEmail } from "./email";

export const sendChangeEmailtokenEmail = async (
  url: string,
  name: string,
  email: string,
): Promise<void> => {
  const template = changeEmailTemplate({
    url,
    name,
  });

  const data = await sendEmail(email, template);

  if (!data) {
    throw serverError;
  }

  console.log(`Email sent to ${email} id: ${data.id}`);
};
