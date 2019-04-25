// import { nodemailer } from "nodemailer";
const env = require("dotenv");

// import env from "dotenv";
const nodemailer = require("nodemailer");

env.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAILERUSERNAME,
    pass: process.env.GMAILPASSWORD,
  },
});

const mailOptions = {
  from: "nennydike@gmail.com",
  to: "nennyfills@yahoo.com, nennydike@gmail.com",
  subject: "Sending Email using Node.js",
  text: "hi",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return error;
  }
  return (`Email sent: ${info.response}`);
});
