"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = {
  authorized: function authorized(req, res, next) {
    var headerToken = req.headers.authorization.split(" ")[1];

    if (!headerToken) {
      return res.status(401).send("Missing Authorizations");
    }

    var encoded = _jsonwebtoken["default"].verify(headerToken, process.env.SECRET_KEY);

    var users = _database.database.USER.find(function (user) {
      return user.email === encoded.email;
    });

    var admin = _database.database.ADMIN.find(function (user) {
      return user.email === encoded.email;
    });

    var staff = _database.database.STAFF.find(function (user) {
      return user.email === encoded.email;
    });

    var currentUser = users || admin || staff;

    if (!currentUser) {
      return res.status(404).send("Cannot find current user");
    }

    req.currentUser = encoded;
    return next();
  }
};