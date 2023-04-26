import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createTransport } from "nodemailer";
import config from "../config/config.js";

const transport = createTransport({
  host: config.ADMIN_EMAIL_HOST,
  port: +config.ADMIN_EMAIL_PORT,
  auth: {
    user: config.ADMIN_EMAIL_ADDRESS,
    pass: config.ADMIN_EMAIL_APP_PASSWORD
  }
});

async function sendEmail({ to, subject, templateName, context }: {
  to: string;
  subject: string;
  templateName: string;
  context: Record<string, any>;
}) {
  try {
    const fileContents = await readFile(
      join(process.cwd(), "server", "email-templates", `${templateName}.html`),
      "utf-8"
    );
    const htmlMessage = addContext(fileContents, context);
    return transport.sendMail({
      from: config.ADMIN_EMAIL_ADDRESS,
      to,
      subject,
      html: htmlMessage,
      text: stripTags(htmlMessage)
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

function addContext(fileContents: string, ctx: Record<string, any>): string {
  return fileContents.replace(/\{\{\s*([^\s]+)\s*\}\}/g, (_, key) => ctx[key] ?? "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

export default {
  sendEmail,
};