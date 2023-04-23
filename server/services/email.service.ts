import { SMTPClient } from "denomailer";
import { render } from "./template.service.ts";
import config from "../config/config.ts";

const smtpClient = new SMTPClient({
  connection: {
    hostname: config.ADMIN_EMAIL_HOST,
    port: +config.ADMIN_EMAIL_PORT,
    tls: true,
    auth: {
      username: config.ADMIN_EMAIL_ADDRESS,
      password: config.ADMIN_EMAIL_APP_PASSWORD
    }
  }
});

const sendEmail = (
  template: string,
  { to, subject }: {
    to: string;
    subject: string;
  },
  ctx: Exclude<Parameters<typeof render>[1], undefined>
) => {
  const content = render(`emails/${template}.jinja`, ctx);

  return smtpClient.send({
    from: config.ADMIN_EMAIL_ADDRESS,
    to,
    subject,
    content,
    html: content
  });
};

export default {
  sendEmail
};