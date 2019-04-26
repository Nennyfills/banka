"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _accounts = _interopRequireDefault(require("../database/models/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, null, [{
    key: "delete",
    value: function _delete(req, res) {
      _accounts["default"].DeleteAccount(req.params.accountnumber, function (err, data) {
        if (err) {
          res.status(404).json({
            status: 404,
            error: err,
            message: "Acount not found"
          });
          return;
        }

        res.status(200).json({
          status: 200,
          message: "Delete successful",
          data: data
        });
      });
    }
  }, {
    key: "accountsByAccountNumber",
    value: function accountsByAccountNumber(req, res) {
      var userAccount = Number(req.params.accountnumber);

      _accounts["default"].getAcountByAccountNumber(userAccount, function (err, data) {
        if (err) {
          res.status(400).json({
            status: 400,
            message: "Invalid account",
            error: err
          });
          return;
        } // stop early


        res.status(200).json({
          status: 200,
          message: "Request was successfully",
          data: data
        });
      });
    }
  }, {
    key: "viewAllAccount",
    value: function viewAllAccount(req, res) {
      var status = req.query.status;

      _accounts["default"].getAllAccounts(status, function (err, data) {
        if (err) {
          res.status(400).json({
            status: 400,
            message: "Invalid account",
            error: err
          });
          return;
        }

        res.status(200).json({
          status: 200,
          message: "Request was successfully",
          data: data
        });
      });
    }
  }, {
    key: "accountsByEmail",
    value: function accountsByEmail(req, res) {
      var useEmail = req.params.email;

      _accounts["default"].getAcountByEmail(useEmail, function (err, data) {
        if (err) {
          res.status(400).json({
            status: 400,
            message: "account not found",
            error: err
          });
          return;
        } // stop early


        res.status(200).json({
          status: 200,
          message: "Request was successfully",
          data: data
        }); //   (data);
      });
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;