import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);

describe("Post /auth/signup", () => {
  describe("Testing signup", () => {
    it("should register a new user once all the parameters are given", () => {
      const data = {
        type: "USER",
        email: "henry@gmail.com",
        firstName: "henry",
        surName: "wills",
        password: "love",
      };

      chai.request(app)
        .post(" /api/v1/auth/signup")
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).tobe(data);
        });
    });
  });

  describe("create account", () => {
    describe("if parameters are correct", () => {
      const endpoint = "/api/v1/account/";
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
            expect(res.body.data.firstName).toBe(payload.body.firstName);
            expect(res.body.data.surName).toBe(payload.body.surName);
            expect(res.body.data.openingBalance).toBe(payload.body.openingBalance);
            expect(res.body.data.type).toBe(payload.body.type);
            expect(res.body.data.email).toBe(payload.body.email);
            expect(res.body.data.dob).toBe(payload.body.dob);
            expect(res.body.data.phoneNumber).toBe(payload.body.phoneNumber);
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

  describe("Profile", () => {
    const endpoint = `/api/v1/${3008989876}/profile`;
    it("should view a user profile with right acount number", () => {
      chai.request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  });
  describe("Profile", () => {
    const endpoint = `/api/v1/${300898987}/profile`;
    it("should not view a user profile with wrong acount number", () => {
      chai.request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
        });
    });
  });
  describe("Transaction", () => {
    const endpoint = `/api/v1/${3008989876}/profile`;

    it("should view a user transaction with right acount number", () => {
      chai.request(app)
        .get(endpoint)
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
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
