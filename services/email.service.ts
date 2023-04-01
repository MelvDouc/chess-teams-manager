import { SMTPClient } from "denomailer";
import { render } from "/services/template.service.ts";

const { ADMIN_EMAIL_ADDRESS, GOOGLE_APP_PASSWORD } = Deno.env.toObject();
const smtpClient = new SMTPClient({
  connection: {
    hostname: "smtp.gmail.com",
    port: 465,
    tls: true,
    auth: {
      username: ADMIN_EMAIL_ADDRESS,
      password: GOOGLE_APP_PASSWORD
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
    from: ADMIN_EMAIL_ADDRESS,
    to,
    subject,
    content,
    html: content
  });
};

export default {
  sendEmail
};