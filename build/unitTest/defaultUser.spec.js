"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("@babel/polyfill");

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe("Default controller", function () {
  describe("Testing login", function () {
    var endpoint = "/api/v1/auth/login";
    it("should log in a user with correct email and password", function () {
      _chai["default"].request(_app["default"]).post(endpoint).send({
        email: "mark@hotmail.com",
        password: "love"
      }).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.have.property("token");
      });
    });
    it("should not login a user with wrong email and password", function () {
      _chai["default"].request(_app["default"]).post(endpoint).send({
        email: "mark@hotmail.com",
        password: "love2"
      }).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
      });
    });
  });
});