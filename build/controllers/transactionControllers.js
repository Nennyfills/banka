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
      var accountNumber = Number(req.params.accountnumber);

      _transactions["default"].findTransactionByAccount({
        accountNumber: accountNumber,
        req: req
      }, function (err, data) {
        if (err) {
          res.status(404).json({
            status: 404,
            message: err.message
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

      _transactions["default"].findTransactionById({
        transactionId: transactionId,
        req: req
      }, function (err, data) {
        if (err) {
          res.status(404).json({
            status: 404,
            message: err.message
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
    key: "viewAccountDate",
    value: function viewAccountDate(req, res) {
      var _req$query = req.query,
          startDate = _req$query.startDate,
          endDate = _req$query.endDate;

      _transactions["default"].findTransactionByDate({
        startDate: startDate,
        endDate: endDate,
        req: req
      }, function (err, data) {
        if (err) {
          res.status(404).json({
            status: 404,
            message: err.message
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
  }]);

  return TransactionsController;
}();

var _default = TransactionsController;
exports["default"] = _default;