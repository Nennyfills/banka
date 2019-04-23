"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../database/models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signup",
    value: function signup(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          surName = _req$body.surName,
          password = _req$body.password;

      _user["default"].create({
        email: email,
        firstName: firstName,
        surName: surName,
        password: password
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
    key: "createUserAccount",
    value: function createUserAccount(req, res) {
      var _req$body2 = req.body,
          firstName = _req$body2.firstName,
          surName = _req$body2.surName,
          openingBalance = _req$body2.openingBalance,
          phoneNumber = _req$body2.phoneNumber,
          type = _req$body2.type;
      var email = req.currentUser.email;

      _user["default"].createUserAccount({
        firstName: firstName,
        surName: surName,
        openingBalance: openingBalance,
        phoneNumber: phoneNumber,
        type: type,
        email: email
      }, function (err, data) {
        if (err) {
          res.status(400).json({
            status: 400,
            message: "Account not sucessfully created",
            error: err
          });
          return;
        } // stop early


        res.status(201).json({
          status: 201,
          message: "Account created",
          data: data
        });
      });
    }
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;