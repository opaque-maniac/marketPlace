export const changePasswordTemplate = ({
  url,
  name,
  support_link,
}: {
  url: string;
  name: string;
  support_link: string;
}): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Change Your Password</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Change Your Password</h2>
        <p>Hi ${name},</p>
        <p>We received a request to change the password for your <strong>Hazina</strong> account. To proceed, please click the button below and enter a new password.</p>
        <a href="${url}" target="_blank" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Change Password
        </a>
        <p style="margin-top: 20px;">For security reasons, this link will expire in <strong>10 minutes</strong>. If you do not update your password within this time, you will need to request another password change.</p>
        <p>If you did <strong>not</strong> request this change, please ignore this email. Your current password will remain the same.</p>
        <p style="margin-top: 20px;">If you have any concerns about your account’s security, please contact our support team.</p>
        <a href="${support_link}" target="_blank" style="display: inline-block; background-color: #dc3545; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Contact Support
        </a>
        <p style="color: #555;">Best regards,<br><strong>Hazina Team</strong></p>
    </div>
  </body>
  </html>
  `;
};
