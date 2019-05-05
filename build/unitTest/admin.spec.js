"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("@babel/polyfill");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe("Admin controller", function () {
  var token;
  beforeEach(function () {
    token = "Bearer ".concat(_jsonwebtoken["default"].sign({
      type: "ADMIN",
      email: "admin@FileList.com"
    }, process.env.SECRET_KEY, {
      expiresIn: "7d"
    }));
  });
  it("should create staff or admin once all the parameters are given", function () {
    var payload = {
      email: "staff2@FileList.com",
      firstname: "Joy",
      surName: "dills",
      password: "love",
      isAdmin: "true",
      type: "STAFF"
    };

    _chai["default"].request(_app["default"]).post("/api/v1/auth/account").set("Authorization", token).send(payload).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body.data.email).to.equal(payload.email);
      (0, _chai.expect)(res.body.data.surName).to.equal(payload.surName);
      (0, _chai.expect)(res.body.data.firstname).to.equal(payload.firstname);
      (0, _chai.expect)(res.body.data.isAdmin).to.equal(true);
      (0, _chai.expect)(res.body.data).to.have.property("id");
    });
  });
  describe("Activate", function () {
    var endpoint = "/api/v1/4008989879";
    it("should activate a user once the right account number is given", function () {
      _chai["default"].request(_app["default"]).patch(endpoint).set("Authorization", token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.data.accountNumber).to.equal(4008989879);
        (0, _chai.expect)(res.body.data.status).to.equal("active");
      });
    });
  });
  describe("Activate", function () {
    var endpoint = "/api/v1/".concat(300898987);
    it("should not deactivate a user once the wrong account number is given", function () {
      _chai["default"].request(_app["default"]).patch(endpoint).set("Authorization", token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
      });
    });
  });
  describe("Deativate", function () {
    var endpoint = "/api/v1/".concat(3008989871);
    it("should deactivate a user once the right account number is given", function () {
      _chai["default"].request(_app["default"]).patch(endpoint).set("Authorization", token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.data.accountNumber).to.equal(3008989871);
        (0, _chai.expect)(res.body.data.status).to.equal("dormant");
      });
    });
  });
  describe("Deactivate", function () {
    var endpoint = "/api/v1/".concat(300898987);
    it("should not deactivate a user once the wrong account number is given", function () {
      _chai["default"].request(_app["default"]).patch(endpoint).set("Authorization", token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
      });
    });
  });
});