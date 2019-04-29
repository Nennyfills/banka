import { nodemailer } from "nodemailer";

import env from "dotenv";

env.config();

class Email {
  static transporter() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAILERUSERNAME,
        pass: process.env.GMAILPASSWORD,
      },
    });
  }

  static mailOptions(message) {
    Email.transporter().sendMail(message, (err, info) => {
      if (err) {
        return err;
      }
      return "success";
    });
  }
}


// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return error;
//   }
//   return (`Email sent: ${info.response}`);
// });
export default Email;
