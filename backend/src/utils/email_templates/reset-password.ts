export const resetPasswordTemplate = ({
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
    <title>Reset Your Password</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Reset Your Password</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset the password for your <strong>Hazina</strong> account. If you made this request, you can set a new password by clicking the button below:</p>
        <a href="${url}" target="_blank" style="display: inline-block; background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reset Password
        </a>
        <p style="margin-top: 20px;">For security reasons, this password reset link will expire in <strong>10 minutes</strong>. If you do not reset your password within this time, you will need to submit another request.</p>
        <p>If you did <strong>not</strong> request a password reset, please ignore this email. Your password will remain unchanged, and no further action is required.</p>
        <p style="margin-top: 20px;">If you continue to receive password reset emails you did not request, please secure your account and contact our support team.</p>
        <a href="${support_link}" target="_blank" style="display: inline-block; background-color: #dc3545; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Contact Support
        </a>
        <p style="color: #555;">Best regards,<br><strong>Hazina Team</strong></p>
    </div>
  </body>
  </html>
  `;
};
