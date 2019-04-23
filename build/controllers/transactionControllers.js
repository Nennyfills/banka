"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transactions = _interopRequireDefault(require("../database/models/transactions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @params {obj}
 */
var TransactionsController =
/*#__PURE__*/
function () {
  function TransactionsController() {
    _classCallCheck(this, TransactionsController);
  }

  _createClass(TransactionsController, null, [{
    key: "transactionByAccount",
    value: function transactionByAccount(req, res) {
      var userAccount = parseInt(req.params.accountnumber);

      _transactions["default"].findTransactionByAccount(userAccount, function (err, data) {
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
    key: "transactionById",
    value: function transactionById(req, res) {
      var transactionId = parseInt(req.params.transactionId);

      _transactions["default"].findTransactionById(transactionId, function (err, data) {
        if (err) {
          res.status(400).json({
            status: 400,
            message: "Invalid id",
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
  }]);

  return TransactionsController;
}();

var _default = TransactionsController;
exports["default"] = _default;