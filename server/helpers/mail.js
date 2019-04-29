// import { nodemailer } from "nodemailer";
// // const env = require("dotenv");

// import env from "dotenv";
// // const nodemailer = require("nodemailer");

env.config();
class Email(){

  static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAILERUSERNAME,
      pass: process.env.GMAILPASSWORD,
    },
  });
  
  static mailOptions(){
    
    Email.transporter().sendMail(message,(err, info)=>{
      if(err){
        return err;
      }
      return "success";
    })
  };
}


// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return error;
//   }
//   return (`Email sent: ${info.response}`);
// });
