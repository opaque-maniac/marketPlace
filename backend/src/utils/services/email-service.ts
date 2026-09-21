import { Resend } from "resend";
import EmailTemplateService from "./email-template-service";
import type { EmailResponse, EmailTemplateData, EmailType } from "../definitons/emails";
import type { UserType } from "../definitons/users";

const apiKey = process.env.RESEND_API_KEY;
const isDev = process.env.ENVIRONMENT == "development";
const productionEmail = process.env.RESEND_EMAIL;
const customDomain = process.env.CUSTOMER_CLIENT_HOST
const sellerDomain = process.env.SELLER_CLIENT_HOST
const staffDomain = process.env.STAFF_CLIENT_HOST

export default class EmailService {
  resend: Resend;
  fromAddress: string;
  templates: EmailTemplateService = new EmailTemplateService();

  constructor() {
    if (!customDomain || !sellerDomain || !staffDomain) {
      throw new Error("Client domain env variables not set")
    }

    if (!apiKey) {
      throw new Error("RESEND_API_KEY env variable is not set");
    }

    this.fromAddress =
      !isDev && productionEmail
        ? productionEmail
        : "Acme<oboarding@resend.com>";

    this.resend = new Resend(apiKey);
  }

  async sendSecurityEmail(
    emailType: EmailType,
    userType: UserType,
    email: string,
    firstName: string,
    lastName: string,
    token: string,
  ): Promise<EmailResponse> {
    const renderedTemp = await this.templates.render(
      emailType,
      this.generatePayload(
        userType,
        emailType,
        firstName,
        lastName,
        token,
      )
    );
    return await this.sendEmail(
      email,
      this.generateSubject(emailType),
      renderedTemp,
    );
  }

  private async sendEmail(
    email: string,
    subject: string,
    content: string,
  ): Promise<EmailResponse> {
    const { data, error } = await this.resend.emails.send({
      from: this.fromAddress,
      to: [email],
      subject,
      html: content,
    });

    return {
      sucess: !error,
      id: data?.id,
      error,
    };
  }

  private generateSubject(emailType: EmailType): string {
    switch (emailType) {
      case "welcome":
        return "Welcome to Hazina";
      case "verify-email":
        return "Verify Your Email";
      case "verify-device":
        return "Verify New Device";
      case "change-email":
        return "Verify New Email";
      case "reset-password":
        return "Reset Profile Password";
      case "change-password":
        return "Change Profile Password";
    }
  }

  private generatePayload(
    userType: UserType,
    emailType: EmailType,
    firstName: string,
    lastName: string,
    token: string,
  ): EmailTemplateData {
    var base_url: string

    switch (userType) {
      case "customer":
        base_url = customDomain!
        break;
      case "staff":
        base_url = staffDomain!
        break;
      case "seller":
        base_url = sellerDomain!
        break;
    }

    var pathname: string

    switch (emailType) {
      case "verify-email":
      case "verify-device":
      case "reset-password":
        pathname = emailType
        break
      case "change-email":
      case "change-password":
        pathname = `security/${emailType}`
      default:
        pathname = ""
    }

    const service_url = `${base_url}/${pathname}`

    return {
      first_name: firstName,
      last_name: lastName,
      token_url: `${service_url}?token=${token}`,
      try_again_url: service_url,
      support_url: `${base_url}/contact`
    }
  }
}
