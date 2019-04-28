// import { nodemailer } from "nodemailer";
// // const env = require("dotenv");

// import env from "dotenv";
// // const nodemailer = require("nodemailer");

// env.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAILERUSERNAME,
//     pass: process.env.GMAILPASSWORD,
//   },
// });

// const mailOptions = {
//   from: "BANKA<noreply-banka>",
//   to: "nenny@gmail.com",
//   subject: "Alert",
//   text: `Acct: 300***${}
//          Date: ${}
//          Bal: ${}
//          ${}
//          `,
//   html: ``
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return error;
//   }
//   return (`Email sent: ${info.response}`);
// });
