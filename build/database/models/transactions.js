"use strict";

var _database = require("../database");

exports.findTransactionByAccount = function (data, callbk) {
  var accounts = _database.database.TRANSACTION;
  var account = accounts.find(function (acc) {
    return acc.accountNumber === data;
  });

  if (!account) {
    callbk(data, null);
    return;
  }

  callbk(null, accounts);
};

exports.findTransactionById = function (data, callbk) {
  var accounts = _database.database.TRANSACTION;
  var account = accounts.find(function (acc) {
    return acc.id === data;
  });
  account;

  if (!account) {
    callbk("".concat(data, " invalid id"), null);
    return;
  }

  callbk(null, account);
};