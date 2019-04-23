"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("@babel/polyfill");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe("Staff controller", function () {
  var token;
  beforeEach(function () {
    token = "Bearer ".concat(_jsonwebtoken["default"].sign({
      type: "STAFF",
      email: "staff@FileList.com"
    }, process.env.SECRET_KEY, {
      expiresIn: "7d"
    }));
  });
  describe("Credit", function () {
    var endpoint = "/api/v1/4008989879/credit";
    var payload = {
      body: {
        accountNumber: 4008989879,
        amount: 1000
      }
    };
    it("should credit a  user once the right account number is given", function () {
      _chai["default"].request(_app["default"]).post(endpoint).set("Authorization", token).send(payload.body).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.data.accountNumber).to.equal(payload.body.accountNumber);
        (0, _chai.expect)(res.body.data.amount).to.equal(payload.body.amount);
      });
    });
    it("should not credit a user once the wrong account number is given", function () {
      _chai["default"].request(_app["default"]).post("/api/v1/30089898/credit").set("Authorization", token).send({
        amount: 1000
      }).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
      });
    });
  });
  describe("Debit", function () {
    var endpoint = "/api/v1/4008989879/debit";
    var payload = {
      json: true,
      body: {
        amount: 500
      }
    };
    it("should debit a  user once the right account number is given", function () {
      _chai["default"].request(_app["default"]).post(endpoint).set("Authorization", token).send(payload.body).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.data.accountNumber).to.equal(4008989879);
        (0, _chai.expect)(res.body.data.transactionType).to.equal("debit");
      });
    });
    it("should not Debit a  user once the wrong account number is given", function () {
      _chai["default"].request(_app["default"]).post("/api/v1/300898987/credit").set("Authorization", token).send({
        amount: 1000
      }).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
      });
    });
  });
});