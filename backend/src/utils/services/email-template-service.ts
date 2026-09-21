import path from "path";
import type { EmailTemplateData, EmailType } from "../definitons/emails";
import { readFile } from "fs/promises";

const cache: Map<EmailType, string> = new Map();

export default class EmailTemplateService {
  private basePath: string;

  constructor() {
    this.basePath = path.join(__dirname, "../templates");
  }

  async render(emailType: EmailType, data: EmailTemplateData): Promise<string> {
    var templateContent: string;

    if (cache.has(emailType)) {
      templateContent = cache.get(emailType)!;
    } else {
      templateContent = await this.read(emailType);
    }

    return this.parse(templateContent, data);
  }

  private async read(emailType: EmailType): Promise<string> {
    const templatePath = path.join(this.basePath, `${emailType}.html`);
    const fileData = await readFile(templatePath, "utf-8");
    cache.set(emailType, fileData);
    return fileData;
  }

  // TODO: convert emails to templates
  // TODO: Look into whether this being async would be faster
  private parse(templateContent: string, data: EmailTemplateData): string {
    for (let key of Object.keys(data)) {
      templateContent.replace(`{{${key}}}`, data[key]);
    }
    return templateContent;
  }
}
