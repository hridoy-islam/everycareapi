import nodemailer from "nodemailer";
import ejs from "ejs";

export const sendUnlockEmail = async (props: {
  to: string;
  subject: string;
  name: string;
  unlockType: string;
  unlockMessage: string;
}) => {
  const { to, subject, name, unlockType, unlockMessage } = props;

  const transporter = nodemailer.createTransport({
    host: "mail.everycareromford.co.uk",
    port: 465,
    secure: true,
    auth: {
      user: "admin@everycareromford.co.uk",
      pass: "St4rting0ver!!!",
    },
  });

  try {
    const html = await ejs.renderFile(
      __dirname + "/../static/email_template/unlock_notification.ejs",
      {
        name,
        unlockType,
        unlockMessage,
        websiteUrl: "career.everycareromford.co.uk",
      }
    );

    const info = await transporter.sendMail({
      from: '"Everycare" <admin@everycareromford.co.uk>',
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error("Error sending unlock email:", error);
    throw error;
  }
};