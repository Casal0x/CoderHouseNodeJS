import nodemailer from "nodemailer";
import { GMAIL_USER, GMAIL_PASS } from "../config";

const d = Date(Date.now());
const a = d.toString();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || GMAIL_USER,
    pass: process.env.GMAIL_PASS || GMAIL_PASS,
  },
});

export const sendGmailLogin = (email) => {
  const mailLogin = {
    from: "Server APP Back Office",
    to: email,
    cc: "magakaefe@hotmail.com",
    subject: "Login de Usuario",
    html: `
        <h1>User Login</h1>
        <h2> Se ha conectado un usuario con el mail: ${email}</h2>
        <h2> La hora es ${a}</h2>`,
  };

  transporter.sendMail(mailLogin, (err, info) => {
    if (err) {
    } else {
    }
  });
};

export const sendGmailLogout = (email) => {
  const mailLogout = {
    from: "Server APP Back Office",
    to: email,
    subject: "Logout de Usuario",
    html: `
        <h1>User Logout</h1>
        <h2> Se ha desconectado un usuario con el mail: ${email}</h2>
        <h2> La hora es ${a}</h2>`,
  };

  transporter.sendMail(mailLogout, (err, info) => {
    if (err) {
    } else {
    }
  });
};
