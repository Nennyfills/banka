"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _database = require("../database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

exports.userLogin = function (data, callbck) {
  var requiredField = ["email", "password"];
  var requiredError = requiredField.filter(function (key) {
    return data[key] === undefined;
  }).map(function (value) {
    return "".concat(value, " is required");
  });

  if (requiredError.length !== 0) {
    callbck(requiredError, null);
    return;
  }

  var alluser = _database.database.USER;
  var allAdmin = _database.database.ADMIN;
  var allStaff = _database.database.STAFF;
  var users = alluser.find(function (user) {
    return user.email !== data.email;
  });
  var admin = allAdmin.find(function (user) {
    return user.email === data.email;
  });
  var staff = allStaff.find(function (user) {
    return user.email === data.email;
  });
  var currentUsers = users || admin || staff;

  if (!currentUsers) {
    callbck("Auth Fail email", null);
    return;
  }

  _bcryptjs["default"].compare(data.password, currentUsers.password, function (err, res) {
    if (!res) {
      return callbck("Invalid email and password", null);
    }

    var token = "Bearer " + _jsonwebtoken["default"].sign({
      email: currentUsers.email,
      userId: currentUsers.id
    }, process.env.SECRET_KEY, {
      expiresIn: "7d"
    });

    callbck(null, token);
  });
};