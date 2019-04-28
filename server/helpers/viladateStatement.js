

// exports.errorResponse = (response, res) => {
//   // try {
//   const { key } = response.error.details[0].context;
//   const { message } = response.error.details[0];
//   const { status } = response.error;

//   if (key === "email") {
//     return res.status(status).json({
//       status,
//       message: "A valid email is required",
//     });
//   }
//   if (key === "phonenumber") {
//     return res.status(status).json({
//       status,
//       message: "A valid phone number is required",
//     });
//   }
//   if (key === "password") {
//     return res.status(status).json({
//       status,
//       message: "Password should be more than 8 character, Include UpperCase letter, Include a number/special charaters.",
//     });
//   }
//   if (key === "amount") {
//     return res.status(status).json({
//       status,
//       message: "Amount is required and must be a positive number",

//     });
//   }
//   if (key === "type") {
//     return res.status(status).json({
//       status,
//       message: "Type is required and should not be longer than 6 character",
//     });

//   }
//   if (key === "firstName" || key === "surname") {
//     return res.status(status).json({
//       status,
//       message: "Firstname and surname is required  and must be an alphabet",
//     });
//   }
//   return res.status(status).json({
//     status,
//     message: "Not Found",
//   });
//   // } catch (err) {
//   //   res.status(400).json({
//   //     status: 400,
//   //     message: err,
//   //   });
//   // }
// };
