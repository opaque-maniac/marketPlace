import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("RESEND_API_KEY is required");
}

const resend = new Resend(apiKey);

export const sendEmail = async (
  email: string,
  template: string,
  subject: string,
) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject,
    html: template,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
