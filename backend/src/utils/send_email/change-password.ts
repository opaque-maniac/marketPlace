import { changePasswordTemplate } from "../email_templates/change-password";
import { serverError } from "../globals";
import { sendEmail } from "./email";

export const sendChangePasswordEmail = async (
  url: string,
  name: string,
  clientHost: string,
  email: string,
): Promise<void> => {
  const template = changePasswordTemplate({
    url,
    name,
    support_link: `${clientHost}/contact`,
  });

  const data = await sendEmail(email, template);

  if (!data) {
    throw serverError;
  }

  console.log(`Email sent to ${email} id: ${data.id}`);
};
