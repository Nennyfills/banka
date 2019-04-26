"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _staff = _interopRequireDefault(require("../database/models/staff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StaffController =
/*#__PURE__*/
function () {
  function StaffController() {
    _classCallCheck(this, StaffController);
  }

  _createClass(StaffController, null, [{
    key: "debit",
    value: function debit(req, res) {
      var amount = req.body.amount;
      var cashierEmail = req.currentUser.email;
      var accountNumber = Number(req.params.accountnumber);

      _staff["default"].debitUser({
        amount: amount,
        cashierEmail: cashierEmail,
        accountNumber: accountNumber
      }, function (err, data) {
        if (err) {
          res.status(err.code).json({
            status: err.code,
            error: err,
            message: err.message
          });
          return;
        }

        res.status(200).json({
          status: 200,
          message: "Debit successful",
          data: data
        });
      });
    }
  }, {
    key: "credit",
    value: function credit(req, res) {
      var amount = req.body.amount;
      var cashierEmail = req.currentUser.email;
      var accountNumber = Number(req.params.accountnumber);

      _staff["default"].creditUser({
        amount: amount,
        cashierEmail: cashierEmail,
        accountNumber: accountNumber
      }, function (err, data) {
        if (err) {
          res.status(err.code).json({
            status: err.code,
            error: err,
            message: err.message
          });
          return;
        }

        res.status(200).json({
          status: 200,
          message: "Credit successful",
          data: data
        });
      });
    }
  }]);

  return StaffController;
}();

var _default = StaffController;
exports["default"] = _default;