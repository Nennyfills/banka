"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defaultusers = _interopRequireDefault(require("../database/models/defaultusers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DefaultUserController =
/*#__PURE__*/
function () {
  function DefaultUserController() {
    _classCallCheck(this, DefaultUserController);
  }

  _createClass(DefaultUserController, null, [{
    key: "login",
    value: function login(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      _defaultusers["default"].userLogin({
        email: email,
        password: password
      }, function (err, data) {
        if (err) {
          res.status(400).json({
            status: 400,
            message: err.message
          });
          return;
        }

        res.status(200).json({
          status: 200,
          message: "Login successful",
          token: data
        });
      });
    }
  }]);

  return DefaultUserController;
}();

var _default = DefaultUserController;
exports["default"] = _default;