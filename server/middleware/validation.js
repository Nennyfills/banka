import Joi from "joi";

const errorResponse = async (response, { error, res }) => {
  try {
    if (response.error) {
      const responses = response.error.details[0].context.key;
      if (responses === "password") {
        res.status(400).json({
          status: 400,
          message: "Password is required(should be longer than 8 character, Include UpperCase letter, Include a number/special charaters.)",
        });
        return;
      }
      if (responses === "email") {
        res.status(400).json({
          status: 400,
          message: "A valid email is required",
        });
        return;
      }
      if (responses === "phonenumber") {
        res.status(400).json({
          status: 400,
          message: "A valid phone number is required",
        });
        return;
      }
      if (responses === "amount") {
        res.status(400).json({
          status: 400,
          message: "Amount is required and must be a positive number",

        });
        return;
      }
      if (responses === "type") {
        res.status(400).json({
          status: 400,
          message: "Type is required and should not be longer than 6 character",
        });
        return;
      }
      if (responses === "firstName" || responses === "surname") {
        res.status(400).json({
          status: 400,
          message: "Firstname and surname is required  and must be an alphabet",
        });
        return;
      }
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err,
    });
  }
};
exports.login = (req, res, next) => {
  const SchemaLogin = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  });
  const responses = Joi.validate(req.body, SchemaLogin);
  if (responses.error) {
    res.status(400).json({
      message: "Wrong email and password",
    });
    return;
  }
  next();
};

exports.signUp = async (req, res, next) => {
  try {
    const Schema = Joi.object().keys({
      firstName: Joi.string().regex(/^[a-zA-Z]*$/).min(3).max(15)
        .required(),
      surname: Joi.string().regex(/^[a-zA-Z]*$/).min(3).max(15)
        .required(),
      password: Joi.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phonenumber: Joi.string().regex(/^[0-9]+$/).required(),
    });
    const response = Joi.validate(req.body, Schema);
    await errorResponse(response, res);
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

exports.adminCreate = async (req, res, next) => {
  try {
    const Schema = Joi.object().keys({
      firstName: Joi.string().regex(/^[a-zA-Z]*$/).min(3).max(15)
        .required(),
      surname: Joi.string().regex(/^[a-zA-Z]*$/).min(3).max(15)
        .required(),
      password: Joi.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phonenumber: Joi.string().regex(/^[0-9]+$/).required(),
      type: Joi.string().regex(/^[a-zA-Z]*$/).min(3).max(6)
        .required(),
    });
    const response = Joi.validate(req.body, Schema);
    await errorResponse(response, res); next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

exports.creditAndDebit = async (req, res, next) => {
  try {
    const SchemaLogin = Joi.object().keys({
      depositor: Joi.string().min(7).max(30),
      amount: Joi.number().positive().required(),
    });
    const response = Joi.validate(req.body, SchemaLogin);
    await errorResponse(response, res);
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error,
    });
  }
};
