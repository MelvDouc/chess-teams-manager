import { SmtpClient } from "smtp";

const smtpClient = new SmtpClient();

await smtpClient.connect({
  hostname: "smtp.gmail.com",
  port: 465,
  username: Deno.env.get("ADMIN_EMAIL"),
  password: Deno.env.get("MAILER_PASSWORD"),
});

const sendEmail = smtpClient.send.bind(smtpClient);

export { sendEmail };