"use strict";

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _database = require("../database");

var _dbControllers = _interopRequireDefault(require("../dbControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

exports.createStaffAdmin = function (data, callbk) {
  var requiredField = ["firstname", "surName", "password", "email", "type"];
  var requiredError = requiredField.filter(function (key) {
    return data[key] === undefined;
  }).map(function (value) {
    return "".concat(value, " is required");
  });

  if (requiredError.length !== 0) {
    callbk(requiredError, null);
    return;
  }

  var admins = _database.database.ADMIN;
  var staffs = _database.database.STAFF;
  var admin = admins.filter(function (eachUser) {
    return eachUser.email === data.email;
  });
  var staff = staffs.filter(function (eachUser) {
    return eachUser.email === data.email;
  });

  if (staff.length !== 0 || admin.length !== 0) {
    callbk("email already exist", null);
    return;
  }

  var hash = _bcryptjs["default"].hashSync(data.password, 10);

  var isAdmin = true;
  var password = hash;
  var email = data.email,
      firstname = data.firstname,
      surName = data.surName,
      type = data.type;
  var allData = {
    isAdmin: isAdmin,
    type: type,
    password: password,
    email: email,
    firstname: firstname,
    surName: surName
  };

  var newuser = _dbControllers["default"].saveData(allData);

  delete newuser.password;
  delete newuser.type; //  (newuser)

  callbk(null, newuser);
};

exports.toggleAccountStatus = function (data, callbk) {
  var accounts = _database.database.ACCOUNT;
  var account = accounts.find(function (acc) {
    return acc.accountNumber === data;
  });

  if (!account) {
    callbk("".concat(data, " was not found"), null);
    return;
  }

  account.status = account.status === "active" ? "dormant" : "active";
  var accountNumber = account.accountNumber,
      status = account.status;

  _dbControllers["default"].updataDb(account);

  callbk(null, {
    accountNumber: accountNumber,
    status: status
  });
};