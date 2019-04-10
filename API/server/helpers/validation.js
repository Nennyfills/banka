// import Joi from "joi";

// module.exports = {
//   validateBody: (schema) => {
//     return (req, res, nxt) => {
//             const result = Joi.validate(req.body, schema)
//             if (result.error)
//                 result.status(400).json(result.error)
            
//         };
//     if (!req.vaule) {
//       req.value = {}; {
//         req.value.body = result.value;
//         next();
//       }
//     }
//     {
//       Joi.object().keys({
//         firstName: Joi.string().required(),
//         surName: Joi.string().required(),
//         password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
//         phoneNumber: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
//         email: Joi.string().email().required(),

//       });
//     }
//   },
// };
