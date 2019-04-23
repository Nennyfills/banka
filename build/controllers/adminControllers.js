"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _admin = _interopRequireDefault(require("../database/models/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdminController =
/*#__PURE__*/
function () {
  function AdminController() {
    _classCallCheck(this, AdminController);
  }

  _createClass(AdminController, null, [{
    key: "createStaffAdminAccount",
    value: function createStaffAdminAccount(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          surName = _req$body.surName,
          password = _req$body.password,
          type = _req$body.type;

      _admin["default"].createStaffAdmin({
        email: email,
        firstName: firstName,
        surName: surName,
        password: password,
        type: type
      }, function (err, data) {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
            message: "Signup not sucessful"
          });
          return; // stop early
        }

        res.status(201).json({
          status: 201,
          message: "User created",
          data: data
        });
      });
    }
  }, {
    key: "toggleAccountStatus",
    value: function toggleAccountStatus(req, res) {
      var userAccountNumber = parseInt(req.params.accountnumber);

      _admin["default"].toggleAccountStatus(userAccountNumber, function (err, data) {
        if (err) {
          res.status(404).json({
            status: 404,
            error: err,
            message: "Acount not founded"
          });
          return;
        }

        res.status(200).json({
          status: 200,
          message: "successfully",
          data: data
        });
      });
    }
  }]);

  return AdminController;
}();

var _default = AdminController;
exports["default"] = _default;