"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dbControllers = _interopRequireDefault(require("../dbControllers"));

var _database = require("../database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_dotenv["default"].config();

exports.create = function (data, callbk) {
  var requiredField = ["firstname", "surName", "password", "email"];
  var requiredError = requiredField.filter(function (key) {
    return data[key] === undefined;
  }).map(function (value) {
    return "".concat(value, " is required");
  });

  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }

  var users = _database.database.USER;
  var user = users.filter(function (eachUser) {
    return eachUser.email === data.email;
  });

  if (user.length !== 0) {
    callbk("email already exist", null);
    return;
  }

  var hash = _bcryptjs["default"].hashSync(data.password, 10);

  var isAdmin = false;
  var type = "USER";
  var password = hash;
  var email = data.email,
      firstname = data.firstname,
      surName = data.surName;

  var token = "Bearer " + _jsonwebtoken["default"].sign({
    type: "USER",
    email: email,
    isAdmin: false
  }, process.env.SECRET_KEY, {
    expiresIn: "1h"
  });

  var allData = {
    token: token,
    isAdmin: isAdmin,
    type: type,
    password: password,
    email: email,
    firstname: firstname,
    surName: surName
  };

  var newuser = _dbControllers["default"].saveData(allData);

  delete newuser.password;
  callbk(null, newuser);
};

exports.createUserAccount = function (data, callbk) {
  var requiredField = ["firstname", "surName", "openingBalance", "type", "email", "phoneNumber"];
  var requiredError = requiredField.filter(function (key) {
    return data[key] === undefined;
  }).map(function (value) {
    return "".concat(value, " is required");
  });

  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }

  var users = _database.database.USER;
  var currentUser = users.find(function (eachUser) {
    return eachUser.email === data.email;
  });
  var key = "ACCOUNT";
  var ownerId = currentUser.id;

  var accountNumber = _dbControllers["default"].generateAccountNumber();

  var balance = data.openingBalance;
  var status = "active";
  var type = data.type,
      email = data.email,
      firstname = data.firstname,
      surName = data.surName,
      openingBalance = data.openingBalance,
      phoneNumber = data.phoneNumber;
  var allData = {
    key: key,
    firstname: firstname,
    surName: surName,
    ownerId: ownerId,
    accountNumber: accountNumber,
    phoneNumber: phoneNumber,
    status: status,
    balance: balance,
    type: type,
    email: email
  };

  var newAccount = _dbControllers["default"].saveByKey(allData);

  delete newAccount.key;
  delete newAccount.balance;
  newAccount = _objectSpread({
    openingBalance: openingBalance
  }, newAccount);
  callbk(null, newAccount);
};