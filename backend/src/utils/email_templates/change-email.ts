export const changeEmailTemplate = ({
  url,
  name,
  baseUrl,
}: {
  url: string;
  name: string;
  baseUrl: string;
}): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Verify Your New Email Address</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 20px;">
        <h2 style="color: #333;">Verify Your New Email Address</h2>
        <p>Hi ${name},</p>
        <p>You recently requested to change the email address associated with your <strong>Hazina</strong> account. To complete this update, please verify your new email address by clicking the button below.</p>
        <a target="_blank" href="${url}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Confirm New Email
        </a>
        <p style="margin-top: 20px;">For security reasons, this confirmation link will expire in <strong>10 minutes</strong>. If you do not confirm before it expires, you will need to request a new email change.</p>
        <p>If you did <strong>not</strong> request this change, no action is required, and your current email will remain unchanged.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #555;">Need help? Contact our <a href="${baseUrl}/contact" target="_blank" style="color: #0000FF;">support team</a>.</p>
        <p style="color: #555;">Best regards,<br><strong>Hazina Team</strong></p>
    </div>
  </body>
  </html>
  `;
};
