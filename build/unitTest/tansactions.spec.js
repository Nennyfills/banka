"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("@babel/polyfill");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe("Transaction by account number", function () {
  var token;
  beforeEach(function () {
    token = "Bearer ".concat(_jsonwebtoken["default"].sign({
      type: "USER",
      email: "joy@westlife.com",
      id: 1000001
    }, process.env.SECRET_KEY, {
      expiresIn: "7d"
    }));
  });
  it("should view a user transaction with right acount number", function () {
    _chai["default"].request(_app["default"]).get("/api/v1/".concat(3008989879, "/transactions")).set("Authorization", token).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });
  it("should not view a user transaction with wrong acount number", function () {
    _chai["default"].request(_app["default"]).get("/api/v1/".concat(30089898976, "/transactions")).set("Authorization", token).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
    });
  });
  it("should view a user transaction with right id", function () {
    _chai["default"].request(_app["default"]).get("/api/v1/transactions/".concat(1000001)).set("Authorization", token).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
    });
  });
  it("should not view a user transaction with wrong id", function () {
    _chai["default"].request(_app["default"]).get("/api/v1/transactions/".concat(100000190)).set("Authorization", token).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
    });
  });
});