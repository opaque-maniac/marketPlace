import { resetPasswordTemplate } from "../email_templates/reset-password";
import { serverError } from "../globals";
import { sendEmail } from "./email";

export const sendResetPasswordEmail = async (
  url: string,
  name: string,
  clientHost: string,
  email: string,
): Promise<void> => {
  const template = resetPasswordTemplate({
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
