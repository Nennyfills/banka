import Joi from "joi";

exports.login = (req, res, next) => {
  const SchemaLogin = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required(),
  });
  const response = Joi.validate(req.body, SchemaLogin);
  if (response.error) {
    return res.status(400).json({
      status: 400,
      error: response.error.details[0].message.replace(/[^\w|\s]/g, ""),
    });
  }
  next();
};

exports.signUp = (req, res, next) => {
  const SchemaLogin = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30)
      .required(),
    surname: Joi.string().alphanum().min(3).max(30)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(4).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phonenumber: Joi.string().regex(/^\d{3}-\d{4}-\d{6}$/).required(),
  });
  const response = Joi.validate(req.body, SchemaLogin);
  if (response.error) {
    return res.status(400).json({
      status: 400,
      error: response.error.details[0].message.replace(/[^\w|\s]/g, ""),
    });
  }
  next();
};

exports.adminCreate = (req, res, next) => {
  const SchemaLogin = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30)
      .required(),
    surname: Joi.string().alphanum().min(3).max(30)
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(4).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phonenumber: Joi.string().regex(/^\d{3}-\d{4}-\d{6}$/).required(),
    type: Joi.string().alphanum().min(3).max(8),
  });
  const response = Joi.validate(req.body, SchemaLogin);
  if (response.error) {
    return res.status(400).json({
      status: 400,
      error: response.error.details[0].message.replace(/[^\w|\s]/g, ""),
    });
  }
  next();
};

exports.credit = (req, res, next) => {
  const SchemaLogin = Joi.object().keys({
    depositor: Joi.string().min(7).max(30)
      .required(),
    amount: Joi.number().positive().required(),
    type: Joi.string().alphanum().min(3).max(8),
  });
  const response = Joi.validate(req.body, SchemaLogin);
  if (response.error) {
    return res.status(400).json({
      status: 400,
      error: response.error.details[0].message.replace(/[^\w|\s]/g, ""),
    });
  }
  next();
};
exports.debit = (req, res, next) => {
  const SchemaLogin = Joi.object().keys({
    amount: Joi.number().positive().required(),
  });
  const response = Joi.validate(req.body, SchemaLogin);
  if (response.error) {
    return res.status(400).json({
      status: 400,
      error: response.error.details[0].message.replace(/[^\w|\s]/g, ""),
    });
  }
  next();
};
