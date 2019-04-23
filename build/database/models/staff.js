"use strict";

var _database = require("../database");

var _dbControllers = _interopRequireDefault(require("../dbControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.debitUser = function (data, callbk) {
  var requiredField = ["amount", "accountNumber", "cashierEmail"];
  var requiredError = requiredField.filter(function (key) {
    return data[key] === undefined;
  }).map(function (value) {
    return "".concat(value, " is required");
  });

  if (requiredError.length !== 0) {
    callbk({
      message: requiredError,
      code: 400
    }, null);
    return;
  }

  var amount = data.amount,
      accountNumber = data.accountNumber;

  var cashier = _database.database.STAFF.filter(function (staff) {
    return staff.email === data.cashierEmail;
  }).id;

  var accounts = _database.database.ACCOUNT;
  var account = accounts.find(function (acc) {
    return acc.accountNumber === parseFloat(data.accountNumber);
  });

  if (!account) {
    callbk({
      message: "Account Not Found",
      code: 404
    }, null);
    return;
  }

  if (account.accountBalance < data.amount) {
    callbk({
      message: "Insufficient Funds",
      code: 400
    }, null);
  }

  var oldBalance = account.accountBalance;
  var newBalance = oldBalance - Number(data.amount);
  account.accountBalance = newBalance;

  _dbControllers["default"].updataDb(account);

  var key = "TRANSACTION";
  var transaction = {
    key: key,
    amount: amount,
    type: "debit",
    accountNumber: accountNumber,
    oldBalance: oldBalance,
    newBalance: newBalance,
    cashier: cashier
  };

  _dbControllers["default"].saveByKey(transaction);

  var response = {
    transactionId: transaction.id,
    accountNumber: transaction.accountNumber,
    amount: transaction.amount,
    cashier: transaction.cashier,
    transactionType: transaction.type,
    accountBalance: newBalance
  };
  callbk(null, response);
};

exports.creditUser = function (data, callbk) {
  var requiredField = ["amount", "accountNumber", "cashierEmail"];
  var requiredError = requiredField.filter(function (key) {
    return data[key] === undefined;
  }).map(function (value) {
    return "".concat(value, " is required");
  });

  if (requiredError.length !== 0) {
    callbk({
      message: requiredError,
      code: 400
    }, null);
    return;
  }

  var amount = data.amount,
      accountNumber = data.accountNumber;

  var cashier = _database.database.STAFF.filter(function (staff) {
    return staff.email === data.cashierEmail;
  }).id;

  var accounts = _database.database.ACCOUNT;
  var account = accounts.find(function (acc) {
    return acc.accountNumber === accountNumber;
  });

  if (!account) {
    callbk({
      message: "Account Not Found",
      code: 404
    }, null);
    return;
  }

  var oldBalance = account.accountBalance;
  var newBalance = oldBalance + Number(data.amount);
  account.accountBalance = newBalance;

  _dbControllers["default"].updataDb(account);

  var key = "TRANSACTION";
  var transaction = {
    key: key,
    amount: amount,
    type: "credit",
    accountNumber: accountNumber,
    oldBalance: oldBalance,
    newBalance: newBalance,
    cashier: cashier
  };

  _dbControllers["default"].saveByKey(transaction);

  var response = {
    transactionId: transaction.id,
    accountNumber: transaction.accountNumber,
    amount: transaction.amount,
    cashier: transaction.cashier,
    transactionType: transaction.type,
    accountBalance: newBalance
  };
  callbk(null, response);
};