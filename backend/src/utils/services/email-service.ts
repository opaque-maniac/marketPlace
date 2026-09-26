import { Resend } from "resend";
import EmailTemplateService from "./email-template-service";
import type {
  EmailResponse,
  EmailTemplateData,
  EmailType,
} from "../../definitons/emails";
import type { UserType } from "../../definitons/users";
import { token } from "morgan";

const apiKey = process.env.RESEND_API_KEY;
const isDev = process.env.ENVIRONMENT == "development";
const productionEmail = process.env.RESEND_EMAIL;
const customerDomain = process.env.CUSTOMER_CLIENT_HOST;
const sellerDomain = process.env.SELLER_CLIENT_HOST;
const staffDomain = process.env.STAFF_CLIENT_HOST;

export default class EmailService {
  resend: Resend;
  fromAddress: string;
  templates: EmailTemplateService = new EmailTemplateService();

  constructor() {
    if (!customerDomain || !sellerDomain || !staffDomain) {
      throw new Error("Client domain env variables not set");
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
    payload: EmailTemplateData,
  ): Promise<EmailResponse> {
    const renderedTemp = await this.templates.render(
      emailType,
      this.generatePayload(userType, emailType, payload),
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
      success: !error,
      id: data?.id,
      error,
    };
  }

  private generateSubject(emailType: EmailType): string {
    switch (emailType) {
      case "welcome":
        return "Welcome to Hazina";
      case "verify-email":
        return "Verify Profile Email";
      case "verify-device":
        return "Verify New Device";
      case "change-email":
        return "Verify New Email";
      case "reset-password":
        return "Reset Profile Password";
      case "change-password":
        return "Change Profile Password";
      case "verify-email-staff":
        return "Verify New Staff Sign Up";
      case "onboarding-verification":
        return "Verify Your Seller Profile";
    }
  }

  private generateURLBase(user: UserType, emailType: EmailType): string {
    if (!customerDomain || !sellerDomain || !staffDomain) {
      throw new Error(
        "CUSTOMER_DOMAIN | SELLER_DOMAIN | STAFF_DOMAIN" +
          " not set in env variables",
      );
    }

    var baseUrl: string;

    switch (user) {
      case "customer":
        baseUrl = customerDomain;
        break;
      case "seller":
        baseUrl = sellerDomain;
        break;
      case "staff":
        baseUrl = staffDomain;
        break;
    }

    return baseUrl;
  }

  private generatePathname(emailType: EmailType): string {
    var pathname: string;
    switch (emailType) {
      case "verify-device":
      case "verify-email":
      case "reset-password":
        pathname = emailType;
        break;
      case "change-email":
      case "change-password":
        pathname = `security/${emailType}`;
        break;
      case "onboarding-verification":
        pathname = "verify-email";
        break;
      case "verify-email-staff":
        pathname = "verify-email";
        break;
      default:
        pathname = "";
    }

    return pathname;
  }

  private generateTokenURL(
    user: UserType,
    token: string,
    emailType: EmailType,
  ): string {
    const baseUrl = this.generateURLBase(user, emailType);
    const pathname = this.generatePathname(emailType);
    return `${baseUrl}/${pathname}?role=${user}&token=${token}`;
  }

  private generateTryAgainURL(user: UserType, emailType: EmailType): string {
    const baseUrl = this.generateURLBase(user, emailType);
    const pathname = this.generatePathname(emailType);
    return `${baseUrl}/${pathname}`;
  }

  private generateSupportURL(user: UserType, emailType: EmailType): string {
    const baseUrl = this.generateURLBase(user, emailType);
    return `${baseUrl}/contact`;
  }

  private generatePayload(
    user: UserType,
    emailType: EmailType,
    payload: EmailTemplateData,
  ): EmailTemplateData {
    const validatedPayoad: EmailTemplateData = {};

    for (const entry in Object.entries(payload)) {
      const [key, value] = entry;
      switch (key) {
        case "token":
        case "emailToken":
          validatedPayoad["token_url"] = this.generateTokenURL(
            user,
            value,
            emailType,
          );
          break;
        default:
          validatedPayoad[key] = value;
      }
    }

    validatedPayoad["support_url"] = this.generateSupportURL(user, emailType);
    validatedPayoad["try_again_url"] = this.generateTryAgainURL(
      user,
      emailType,
    );

    return validatedPayoad;
  }
}
