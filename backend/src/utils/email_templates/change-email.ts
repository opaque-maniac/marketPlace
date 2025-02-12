export const changeEmailTemplate = ({
  url,
  name,
}: {
  url: string;
  name: string;
}): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Confirm Your Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Confirm Your New Email Address</h2>
        <p>Hi ${name},</p>
        <p>We received a request to update your email address associated with your <strong>Hazina</strong> account. Before we proceed, we need you to confirm this change.</p>
        <p>Please click the button below to verify your new email address:</p>
        <a target="_blank" href="${url}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Confirm Email
        </a>
        <p style="margin-top: 20px;">For security reasons, this confirmation link will expire in <strong>10 minutes</strong>. If you do not confirm before it expires, you will need to submit another request.</p>
        <p>If you did not request this change, please ignore this email. Your email address will remain the same.</p>
        <p style="color: #555;">Best regards,<br><strong>Hazina Team</strong></p>
    </div>
  </body>
  </html>

  `;
};
