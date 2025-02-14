export const verifyEmailTemplate = (
  name: string,
  url: string,
  baseUrl: string,
): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Verify Your Email Address</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 20px;">
        <h2 style="color: #333;">Verify Your Email Address</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up for <strong>Hazina</strong>! To start using your account, please verify your email address by clicking the button below.</p>
        <a href="${url}" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email
        </a>
        <p style="margin-top: 20px;">For security reasons, this link will expire in <strong>10 minutes</strong>. If the link expires, you can request a new verification email from the <a href="${baseUrl}/verify" target="_blank" style="color: #0000FF;">verification page</a>.</p>
        <p>If you did <strong>not</strong> create this account, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #555;">Need help? Contact our <a href="${baseUrl}/contact" target="_blank" style="color: #0000FF;">support team</a>.</p>
        <p style="color: #555;">Best regards,<br><strong>Hazina Team</strong></p>
    </div>
  </body>
  </html>
  `;
};
