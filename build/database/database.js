"use strict";

var _pg = require("pg");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
var client = new _pg.Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "banka"
});

function execute() {
  return _execute.apply(this, arguments);
}

function _execute() {
  _execute = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref, rows;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return client.connect();

          case 3:
            "Connected successfully.";
            _context.next = 6;
            return client.query("select * from user");

          case 6:
            _ref = _context.sent;
            rows = _ref.rows;
            console.table(rows);
            _context.next = 11;
            return client.end();

          case 11:
            "Client disconnected successfully.";
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            _context.next = 18;
            return "Something wrong happened ".concat(_context.t0);

          case 18:
            _context.prev = 18;
            _context.next = 21;
            return client.end();

          case 21:
            "Client disconnection successfully.";
            return _context.finish(18);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14, 18, 23]]);
  }));
  return _execute.apply(this, arguments);
}