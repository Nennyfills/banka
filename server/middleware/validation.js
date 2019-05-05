import Joi from "joi";

const joyKeys = {
  firstname: Joi.string().trim().regex(/^[a-zA-Z]*$/).min(3).max(15)
    .required(),
  surname: Joi.string().regex(/^[a-zA-Z]*$/).min(3).max(15)
    .required(),
  password: Joi.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  phonenumber: Joi.string().regex(/^[0-9]+$/).required(),
};

const errorResponse = (response, res) => {
  const requiredFields = [
    {
      key: "email",
      message: "A valid email is required",
    },
    {
      key: "depositor",
      message: "A depositor is required",
    },
    {
      key: "phonenumber",
      message: "A valid phonenumber is required",
    },
    {
      key: "password",
      message: "Password should be more than 8 character, Include UpperCase letter, Include a number/special charaters.",
    },
    {
      key: "amount",
      message: "Amount is required and must be a positive number",
    },
    {
      key: "type",
      message: "Type is required and should not be longer than 6 character",
    },
    {
      key: "firstname",
      message: "firstname is required  and must be an alphabet",
    },
    {
      key: "surname",
      message: "surname is required  and must be an alphabet",
    },
  ];
  const { key } = response.error.details[0].context;
  const status = 400;
  const { message } = requiredFields.filter(item => item.key === key)[0];

  res.status(status).json({
    status,
    message,
  });
};

exports.login = (req, res, next) => {
  const Schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  });
  const responses = Joi.validate(req.body, Schema, { allowUnknown: true });
  if (responses.error) {
    res.status(400).json({
      message: "Wrong email and password",
    });
    return;
  }
  next();
};

exports.checkPassword = (password) => {
  if ((/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).test(password)) {
    return true;
  }
  return false;
};

exports.signUp = (req, res, next) => {
  const Schema = Joi.object().keys(joyKeys);
  const response = Joi.validate(req.body, Schema, { allowUnknown: true });
  if (response.error) {
    return errorResponse(response, res);
  }
  next();
};

exports.adminCreate = (req, res, next) => {
  const Schema = Joi.object().keys({
    ...joyKeys,
    type: Joi.string().regex(/^[a-zA-Z]*$/).min(3).max(6)
      .required(),
  });
  const response = Joi.validate(req.body, Schema, { allowUnknown: true });
  if (response.error) {
    return errorResponse(response, res);
  }
  next();
};

exports.debit = (req, res, next) => {
  const Schema = Joi.object().keys({
    amount: Joi.number().positive().required(),
  });
  const response = Joi.validate(req.body, Schema, { allowUnknown: true });
  if (response.error) {
    return errorResponse(response, res);
  }
  next();
};

exports.credit = (req, res, next) => {
  const Schema = Joi.object().keys({
    depositor: Joi.string().trim().min(4).max(30).required(),
    amount: Joi.number().positive().required(),
  });
  const response = Joi.validate(req.body, Schema, { allowUnknown: true });
  if (response.error) {
    return errorResponse(response, res);
  }
  next();
};
