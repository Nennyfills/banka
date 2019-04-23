"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("@babel/polyfill");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

describe("Post /auth/signup", function () {
  describe("User signup", function () {
    it("should register a new user once all the parameters are given", function () {
      var payload = {
        email: "joy2@westlife.com",
        firstName: "Joy",
        surName: "Fills",
        password: "love",
        isAdmin: "false",
        type: "USER"
      };

      _chai["default"].request(_app["default"]).post("/api/v1/auth/signup").send(payload).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body.data.email).to.equal(payload.email);
        (0, _chai.expect)(res.body.data.surName).to.equal(payload.surName);
        (0, _chai.expect)(res.body.data.firstName).to.equal(payload.firstName);
        (0, _chai.expect)(res.body.data.isAdmin).to.equal(false);
        (0, _chai.expect)(res.body.data.status).to.equal("active");
        (0, _chai.expect)(res.body.data).to.have.property("id");
      });
    });
  });
  describe("User can create account", function () {
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
    var endpoint = "/api/v1/accounts";
    describe("if parameters are correct", function () {
      var payload = {
        json: true,
        body: {
          firstName: "Joy",
          surName: "Fills",
          accountNumber: 300984857,
          type: "current",
          openingBalance: parseFloat(3989.40),
          phoneNumber: "0909999890"
        }
      };
      it("should create account once all the parameters are given", function () {
        _chai["default"].request(_app["default"]).post(endpoint).set("Authorization", token).send(payload.body).end(function (err, res) {
          (0, _chai.expect)(res).to.have.status(201);
          (0, _chai.expect)(res.body.data.email).to.equal("joy@westlife.com");
          (0, _chai.expect)(res.body.data.surName).to.equal(payload.body.surName);
          (0, _chai.expect)(res.body.data.firstName).to.equal(payload.body.firstName);
          (0, _chai.expect)(res.body.data.status).to.equal("active");
          (0, _chai.expect)(res.body.data).to.have.property("id");
        });
      });
    });
    it("should not create a new account when the parameters are not given", function () {
      _chai["default"].request(_app["default"]).post(endpoint).set("Authorization", token).send({}).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
      });
    });
  });
  describe("Home page and invalid router", function () {
    describe("Home page", function () {
      it("Should show page on this route '/' ", function () {
        _chai["default"].request(_app["default"]).get("/").end(function (err, res) {
          (0, _chai.expect)(res).to.have.status(200);
        });
      });
    });
    it("Should show page on this route '*' ", function () {
      _chai["default"].request(_app["default"]).get("/ap1/3").end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
      });
    });
  });
});