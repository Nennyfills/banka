"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pgTypes = _interopRequireDefault(require("pg-types"));

var _queries = _interopRequireDefault(require("./queries"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @param s — A string to convert into a number.
    @param radix —
 *  @param {*} values
 */
_pgTypes["default"].setTypeParser(1700, function (val) {
  return parseInt(val, 10);
});

var findEmail =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(email) {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _config["default"].query(_queries["default"].GET_USER_BY_EMAIL([email]));

          case 2:
            res = _context.sent;
            return _context.abrupt("return", res.rows[0]);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var databaseController =
/*#__PURE__*/
function () {
  function databaseController() {
    _classCallCheck(this, databaseController);
  }

  _createClass(databaseController, null, [{
    key: "addUser",
    value: function () {
      var _addUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(values) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _config["default"].query(_queries["default"].ADD_USER(values));

              case 2:
                res = _context2.sent;
                return _context2.abrupt("return", res.rows[0]);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function addUser(_x2) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "findUserByEmail",
    value: function () {
      var _findUserByEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(email) {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _config["default"].query(_queries["default"].GET_USER_BY_EMAIL([email]));

              case 2:
                res = _context3.sent;
                return _context3.abrupt("return", res.rows[0]);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function findUserByEmail(_x3) {
        return _findUserByEmail.apply(this, arguments);
      }

      return findUserByEmail;
    }()
  }, {
    key: "findAccountByEmail",
    value: function () {
      var _findAccountByEmail = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(email) {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _config["default"].query(_queries["default"].GET_ACCOUNT_BY_EMAIL([email]));

              case 2:
                res = _context4.sent;
                return _context4.abrupt("return", res.rows);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function findAccountByEmail(_x4) {
        return _findAccountByEmail.apply(this, arguments);
      }

      return findAccountByEmail;
    }()
  }, {
    key: "findUserById",
    value: function () {
      var _findUserById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id) {
        var res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _config["default"].query(_queries["default"].GET_USER_BY_ID([id]));

              case 2:
                res = _context5.sent;
                return _context5.abrupt("return", res.rows[0]);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function findUserById(_x5) {
        return _findUserById.apply(this, arguments);
      }

      return findUserById;
    }()
  }, {
    key: "findAccountByOwnerid",
    value: function () {
      var _findAccountByOwnerid = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(values) {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _config["default"].query(_queries["default"].GET_ACCOUNT_BY_OWNERID([values]));

              case 2:
                res = _context6.sent;
                return _context6.abrupt("return", res.rows);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function findAccountByOwnerid(_x6) {
        return _findAccountByOwnerid.apply(this, arguments);
      }

      return findAccountByOwnerid;
    }()
  }, {
    key: "findAccountByAccountNumber",
    value: function () {
      var _findAccountByAccountNumber = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(accountNumber) {
        var res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _config["default"].query(_queries["default"].GET_ACCOUNT_BY_ACCOUNTNUMBER([accountNumber]));

              case 2:
                res = _context7.sent;
                return _context7.abrupt("return", res.rows[0]);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function findAccountByAccountNumber(_x7) {
        return _findAccountByAccountNumber.apply(this, arguments);
      }

      return findAccountByAccountNumber;
    }()
  }, {
    key: "findTransactionByAccountNumber",
    value: function () {
      var _findTransactionByAccountNumber = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(accountNumber) {
        var res;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _config["default"].query(_queries["default"].GET_TRANSACTION_BY_ACCOUNTNUMBER([accountNumber]));

              case 2:
                res = _context8.sent;
                return _context8.abrupt("return", res.rows);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function findTransactionByAccountNumber(_x8) {
        return _findTransactionByAccountNumber.apply(this, arguments);
      }

      return findTransactionByAccountNumber;
    }()
  }, {
    key: "findTransactionById",
    value: function () {
      var _findTransactionById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(id) {
        var res;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _config["default"].query(_queries["default"].GET_TRANSACTION_BY_ID([id]));

              case 2:
                res = _context9.sent;
                return _context9.abrupt("return", res.rows);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function findTransactionById(_x9) {
        return _findTransactionById.apply(this, arguments);
      }

      return findTransactionById;
    }()
  }, {
    key: "getAllAccountByAccountNumber",
    value: function () {
      var _getAllAccountByAccountNumber = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(accountNumber) {
        var res;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _config["default"].query(_queries["default"].GET_ACCOUNT_BY_ACCOUNTNUMBER([accountNumber]));

              case 2:
                res = _context10.sent;
                return _context10.abrupt("return", res.rows);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function getAllAccountByAccountNumber(_x10) {
        return _getAllAccountByAccountNumber.apply(this, arguments);
      }

      return getAllAccountByAccountNumber;
    }()
  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(accountnumber) {
        var res;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _config["default"].query(_queries["default"].DELETE_ACCOUNT([accountnumber]));

              case 2:
                res = _context11.sent;
                return _context11.abrupt("return", res.rows[0]);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function deleteAccount(_x11) {
        return _deleteAccount.apply(this, arguments);
      }

      return deleteAccount;
    }()
  }, {
    key: "saveTransaction",
    value: function () {
      var _saveTransaction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(_ref2) {
        var accountNumber, amount, cashierId, depositor, type, oldBalance, newBalance, now, values, res;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                accountNumber = _ref2.accountNumber, amount = _ref2.amount, cashierId = _ref2.cashierId, depositor = _ref2.depositor, type = _ref2.type, oldBalance = _ref2.oldBalance, newBalance = _ref2.newBalance;
                now = new Date();
                values = [accountNumber, amount, cashierId, depositor, type, oldBalance, newBalance, now];
                _context12.next = 5;
                return _config["default"].query(_queries["default"].ADD_TRANSACTION(values));

              case 5:
                res = _context12.sent;
                return _context12.abrupt("return", res.rows[0]);

              case 7:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function saveTransaction(_x12) {
        return _saveTransaction.apply(this, arguments);
      }

      return saveTransaction;
    }()
  }, {
    key: "updateAccountbalance",
    value: function () {
      var _updateAccountbalance = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(_ref3) {
        var accountNumber, newBalance, res;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                accountNumber = _ref3.accountNumber, newBalance = _ref3.newBalance;
                _context13.next = 3;
                return _config["default"].query(_queries["default"].UPDATE_ACCOUNTBALANCE([newBalance, accountNumber]));

              case 3:
                res = _context13.sent;
                return _context13.abrupt("return", res.rows[0]);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function updateAccountbalance(_x13) {
        return _updateAccountbalance.apply(this, arguments);
      }

      return updateAccountbalance;
    }() // static async getAccountbalance(accountbalance) {
    //   const res = await pool.query(QUERY.GET_accountbalance([accountbalance]));
    //   return res.rows[0];
    // }

  }, {
    key: "saveAccount",
    value: function () {
      var _saveAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14(_ref4) {
        var accountNumber, email, openingbalance, type, status, currentUser, now, values, res;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                accountNumber = _ref4.accountNumber, email = _ref4.email, openingbalance = _ref4.openingbalance, type = _ref4.type, status = _ref4.status;
                _context14.next = 3;
                return findEmail(email);

              case 3:
                currentUser = _context14.sent;
                now = new Date();
                values = [currentUser.id, accountNumber, currentUser.email, openingbalance, type, status, now];
                _context14.next = 8;
                return _config["default"].query(_queries["default"].ADD_ACCOUNT(values));

              case 8:
                res = _context14.sent;
                return _context14.abrupt("return", res.rows[0]);

              case 10:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function saveAccount(_x14) {
        return _saveAccount.apply(this, arguments);
      }

      return saveAccount;
    }()
  }, {
    key: "getAllAccount",
    value: function () {
      var _getAllAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15(values) {
        var res;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return _config["default"].query(_queries["default"].GET_ALL_ACCOUNT(values));

              case 2:
                res = _context15.sent;
                return _context15.abrupt("return", res.rows);

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function getAllAccount(_x15) {
        return _getAllAccount.apply(this, arguments);
      }

      return getAllAccount;
    }()
  }, {
    key: "updateAccountStatus",
    value: function () {
      var _updateAccountStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16(_ref5) {
        var accountnumber, status, res;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                accountnumber = _ref5.accountnumber, status = _ref5.status;
                _context16.next = 3;
                return _config["default"].query(_queries["default"].GET_ACCOUNT_BY_STATUS([status, accountnumber]));

              case 3:
                res = _context16.sent;
                return _context16.abrupt("return", res.rows[0]);

              case 5:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function updateAccountStatus(_x16) {
        return _updateAccountStatus.apply(this, arguments);
      }

      return updateAccountStatus;
    }()
  }, {
    key: "searchTansactionByDate",
    value: function () {
      var _searchTansactionByDate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee17(_ref6) {
        var from, to, res;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                from = _ref6.from, to = _ref6.to;
                _context17.next = 3;
                return _config["default"].query(_queries["default"].GET_ACCOUNT_BY_STATUS([from, to]));

              case 3:
                res = _context17.sent;
                return _context17.abrupt("return", res.rows);

              case 5:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function searchTansactionByDate(_x17) {
        return _searchTansactionByDate.apply(this, arguments);
      }

      return searchTansactionByDate;
    }()
  }]);

  return databaseController;
}();

var _default = databaseController;
exports["default"] = _default;