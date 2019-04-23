"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var DATABASE = {
  ADMIN: [{
    type: "ADMIM",
    id: 1000001,
    firstname: "Admin1",
    surname: "Admin1",
    email: "admin@FileList.com",
    phoneNumber: "09080870892",
    password: "$2b$10$peUVM0nFUfGxIoOO55mdW.5bFkadvs8wIDIrikywodrnzvnsXqe52",
    isAdmin: true
  }],
  STAFF: [{
    type: "STAFF",
    id: 1000001,
    firstname: "Staff1",
    surname: "Staff1",
    email: "staff@FileList.com",
    phoneNumber: "09087670892",
    password: "$2b$10$peUVM0nFUfGxIoOO55mdW.5bFkadvs8wIDIrikywodrnzvnsXqe52",
    isAdmin: true
  }],
  USER: [{
    type: "USER",
    id: 1000001,
    firstname: "Joy",
    surname: "Fills",
    email: "joy@westlife.com",
    phoneNumber: "09078754434",
    password: "$2a$10$EfwMJnjkSIV7HXhCZ3SPR.COcbPGLf7WA4Xu0OSV8XAuW.z.6Qqm2",
    isAdmin: false
  }, {
    type: "USER",
    id: 1000002,
    firstname: "Mark",
    surname: "Hibs",
    email: "mark@hotmail.com",
    phoneNumber: "09078754450",
    password: "$2b$10$peUVM0nFUfGxIoOO55mdW.5bFkadvs8wIDIrikywodrnzvnsXqe52",
    isAdmin: false
  }],
  ACCOUNT: [{
    id: 1000001,
    email: "joy@westlife.com",
    accountNumber: 3008989871,
    ownerId: 1000001,
    phoneNumber: "09098765438",
    accountBalance: 31000.09,
    type: "current",
    status: "active",
    createdAt: "2019 - 04 - 04T18: 23: 05.602Z"
  }, {
    id: 1000001,
    email: "joy@westlife.com",
    accountNumber: 3008989879,
    ownerId: 1000001,
    phoneNumber: "09098765438",
    accountBalance: 31000.09,
    type: "current",
    status: "active",
    createdAt: "2019 - 04 - 04T18: 23: 05.602Z"
  }, {
    id: 1000002,
    email: "mark@hotmail.com",
    accountNumber: 4008989879,
    ownerId: 1000001,
    phoneNumber: "09098765438",
    accountBalance: 31000.09,
    type: "current",
    status: "dormant",
    createdAt: "2019 - 04 - 04T18: 23: 05.602Z"
  }, {
    id: 1000002,
    email: "mark@hotmail.com",
    accountNumber: 3008989876,
    phoneNumber: "09080678989",
    ownerId: 1000002,
    accountBalance: 31000.09,
    type: "current",
    status: "active",
    createdAt: "2019 - 04 - 04T18: 23: 05.602Z"
  }],
  TRANSACTION: [{
    key: "TRANSACTION",
    accountNumber: 3008989879,
    id: 1000001,
    amount: 3000,
    casher: 1000001,
    type: "credit",
    oldBalance: 31000.09,
    newBalance: 34000.09,
    createdAt: "2019 - 04 - 04T18: 23: 05.602Z"
  }, {
    key: "TRANSACTION",
    accountNumber: 3008989879,
    id: 1000002,
    amount: 3000,
    casher: 1000001,
    type: "debit",
    oldBalance: 7000.09,
    newBalance: 4000.09,
    createdAt: "2019 - 04 - 04T18: 23: 07.151Z"
  }]
};
var database = DATABASE;

var userdb = _toConsumableArray(DATABASE.USER);

var admindb = _toConsumableArray(DATABASE.ADMIN);

var staff = _toConsumableArray(DATABASE.STAFF);

var accountdb = _toConsumableArray(DATABASE.ACCOUNT);

var transactionsdb = _toConsumableArray(DATABASE.TRANSACTION);

module.exports = {
  database: database,
  userdb: userdb,
  admindb: admindb,
  staff: staff,
  accountdb: accountdb,
  transactionsdb: transactionsdb
};