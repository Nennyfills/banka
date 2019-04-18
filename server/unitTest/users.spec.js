import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";
import jwt from "jsonwebtoken";

chai.use(chaiHttp);

describe("Post /auth/signup", () => {

  describe("User signup", () => {
    it("should register a new user once all the parameters are given", () => {
      const payload = {
        email: "joy2@westlife.com",
        firstName: "Joy",
        surName: "Fills",
        password: "love",
        isAdmin: "false",
        type: "USER",
      };

      chai.request(app)
        .post("/api/v1/auth/signup")
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.email).to.equal(payload.email);
          expect(res.body.data.surName).to.equal(payload.surName);
          expect(res.body.data.firstName).to.equal(payload.firstName);
          expect(res.body.data.isAdmin).to.equal(false);
          expect(res.body.data.status).to.equal("active");
          expect(res.body.data).to.have.property("id");
        });
    });
  });

  describe("User can create account", () => {
    let token;
    beforeEach(() => {
      token = jwt.sign({
        type: "USER",
        email: "joy@westlife.com",
        id: 1000001,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" });
    });

    const endpoint = "/api/v1/account";

    describe("if parameters are correct", () => {
      const payload = {
        json: true,
        body: {
          firstName: "Joy",
          surName: "Fills",
          accountNumber: 300984857,
          type: "current",
          openingBalance: parseFloat(3989.40),
          phoneNumber: "0909999890",
        },
      };
      it("should create account once all the parameters are given", () => {
        chai.request(app)
          .post(endpoint)
          .set("Authorization", token)
          .send(payload.body)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.data.email).to.equal("joy@westlife.com");
            expect(res.body.data.surName).to.equal(payload.body.surName);
            expect(res.body.data.firstName).to.equal(payload.body.firstName);
            expect(res.body.data.status).to.equal("active");
            expect(res.body.data).to.have.property("id");
          });
      });
    });

    it("should not create a new account when the parameters are not given", () => {
      chai.request(app)
        .post(endpoint)
        .set("Authorization", token)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
    });

  });

  describe("Transaction", () => {
    let token;
    beforeEach(() => {
      token = jwt.sign({
        type: "USER",
        email: "joy@westlife.com",
        id: 1000001,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" });
    });

    it("should view a user transaction with right acount number", () => {
      chai.request(app)
        .get(`/api/v1/${3008989876}/profile`)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });

    it("should not view a user transaction with wrong acount number", () => {
      chai.request(app)
        .get(`/api/v1/${300898987}/profile`)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
    });
  });
});