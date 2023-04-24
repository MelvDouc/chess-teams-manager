/*

import { SMTPClient } from "denomailer";
import config from "../config/config.js";

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
  ctx: any
) => {
  // const content = render(`emails/${template}.jinja`, ctx);
  const content = "";

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

*/