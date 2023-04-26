import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createTransport } from "nodemailer";

if (process.env.NODE_ENV !== "production") {
  const { config } = await import("dotenv");
  config();
}

const transport = createTransport({
  host: process.env.ADMIN_EMAIL_HOST,
  port: +process.env.ADMIN_EMAIL_PORT,
  auth: {
    user: process.env.ADMIN_EMAIL_ADDRESS,
    pass: process.env.ADMIN_EMAIL_APP_PASSWORD
  }
});

async function sendEmail({ to, subject, templateName, context }: {
  to: string;
  subject: string;
  templateName: string;
  context: Record<string, any>;
}) {
  try {
    const html = await readFile(join(process.cwd(), "server", "email-templates", templateName), "utf-8");
    const htmlMessage = html.replace(/\{{2}\s*(.+)\s*\}{2}/g, (_, key) => context[key] ?? "");
    return transport.sendMail({
      from: process.env.ADMIN_EMAIL_ADDRESS,
      to,
      subject,
      html: htmlMessage,
      text: htmlMessage.replace(/<[^>]+>/g, "")
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default {
  sendEmail,
};