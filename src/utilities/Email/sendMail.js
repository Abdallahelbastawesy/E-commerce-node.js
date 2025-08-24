import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";


const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "abdallahelbastwesy29@gmail.com",
    pass: "zgue jhli tgff xdiu", 
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (email) => {
  const info = await transporter.sendMail({
    from: '"NTIG13" <ahmed.abdelmawgood200@gmail.com>',

    to: email,

    subject: "Hello ✔",
    text: "Hello world?",
    html: emailTemplate(email),
  });

  console.log("Message sent:", info.messageId);
};
