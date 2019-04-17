import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);

describe("Post /auth/signup", () => {
  describe("Testing signup", () => {
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

  describe("create account", () => {
    describe("if parameters are correct", () => {
      const endpoint = "/api/v1/account";
      const payload = {
        json: true,
        body: {
          firstName: "henery",
          surName: "hills",
          accountNumber: 300984857,
          type: "current",
          openingBalance: parseFloat(3989.40),
          email: "hills@mail.com",
          phoneNumber: "0909999890",
        },
      };
      it("should create account once all the parameters are given", () => {
        chai.request(app)
          .post(endpoint)
          .send(payload.body)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.data.email).to.equal(payload.email);
            expect(res.body.data.surName).to.equal(payload.surName);
            expect(res.body.data.firstName).to.equal(payload.firstName);
            expect(res.body.data.isAdmin).to.equal(true);
            expect(res.body.data.status).to.equal("active");
            expect(res.body.data).to.have.property("id");
          });
      });
    });
    describe("shold not create account if all parameters are not giving", () => {
      const endpoint = "/api/v1/account";
      const payload = {
        json: true,
      };
      it("should not create a new account when the parameters are not given", () => {
        chai.request(app)
          .post(endpoint)
          .send(payload.body)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.statusCode).toBe(400);
            expect(res.body.data).toBeUndefined();
          });
      });
    });
  });

  describe("Transaction", () => {
    const endpoint = `/api/v1/${3008989876}/profile`;

    it("should view a user transaction with right acount number", () => {
      chai.request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });
  });
  describe("Transaction", () => {
    const endpoint = `/api/v1/${300898987}/profile`;

    it("should not view a user transaction with wrong acount number", () => {
      chai.request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });
});