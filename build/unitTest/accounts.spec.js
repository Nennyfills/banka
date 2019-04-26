"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("@babel/polyfill");

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe("Accounts controller", function () {
  var token;
  beforeEach(function () {
    token = "Bearer ".concat(_jsonwebtoken["default"].sign({
      type: "ADMIN",
      email: "admin@FileList.com"
    }, process.env.SECRET_KEY, {
      expiresIn: "7d"
    }));
  });
  describe("Testing Delete route", function () {
    var endpoint = "/api/v1/accounts/3008989879";
    it("should delete account with valid accountnumber is given", function () {
      _chai["default"].request(_app["default"])["delete"](endpoint).set("Authorization", token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
      });
    });
  });
  describe("delete", function () {
    describe("if parameters are correct", function () {
      var endpoint = "/api/v1/accounts/3018989879";
      it("should not delete account once a wrong account number", function () {
        _chai["default"].request(_app["default"])["delete"](endpoint).set("Authorization", token).query({
          accountnumber: 3018989879
        }).end(function (err, res) {
          (0, _chai.expect)(res).to.have.status(404);
        });
      });
    });
  });
  describe("Get all accounts", function () {
    var endpoint = "/api/v1/accounts";
    it("should get all user accounts", function () {
      _chai["default"].request(_app["default"]).get(endpoint).set("Authorization", token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
      });
    });
  });
  describe("Find account by accountNumber", function () {
    var endpoint = "/api/v1/accounts/".concat(3008989876);
    it("should get an account if the right account number is given", function () {
      _chai["default"].request(_app["default"]).get(endpoint).set("Authorization", token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
      });
    });
  });
  describe("Find account by accountNumber", function () {
    var endpoint = "/api/v1/accounts/".concat(897898987);
    it("should not get an account if the wrong account number is given", function () {
      _chai["default"].request(_app["default"]).get(endpoint).set("Authorization", token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
      });
    });
  });
});