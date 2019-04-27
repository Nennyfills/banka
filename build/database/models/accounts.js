"use strict";

var _database = require("../database");

var _dbControllers = _interopRequireDefault(require("../dbControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.DeleteAccount = function (data, callback) {
  var accounts = _database.database.ACCOUNT;
  var matchedAccount = accounts.find(function (accountData) {
    return accountData.accountNumber === Number(data);
  }); 

  if (!matchedAccount) {
    callback("".concat(data, ": not found"), null);
    return;
  }

  _dbControllers["default"].deleteDb(matchedAccount);

  callback(null, "Account deleted");
};

exports.getAcountByAccountNumber = function (data, callbk) {
  var accounts = _database.database.ACCOUNT;
  var account = accounts.find(function (acc) {
    return acc.accountNumber === data;
  });

  if (!account) {
    callbk("".concat(data, " not found"), null);
    return;
  }

  callbk(null, account);
};

exports.getAllAccounts = function (data, callbk) {
  var allAccount = _database.database.ACCOUNT;
  var accountByStatus = allAccount.filter(function (account) {
    return account.status === data;
  });

  if (!data) {
    callbk(null, allAccount);
    return;
  }

  if (accountByStatus.length === 0) {
    callbk("".concat(data, " not found"));
    return;
  }

  callbk(null, accountByStatus);
};

exports.getAcountByEmail = function (data, callbk) {
  var accounts = _database.database.ACCOUNT;
  var account = accounts.filter(function (acc) {
    return acc.email === data;
  });

  if (!account) {
    callbk("".concat(data, " not found"), null);
    return;
  }

  if (account.length === 0) {
    callbk("".concat(data, " not found"));
    return;
  }

  callbk(null, account);
  account;
};