import chai, { expect } from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);
describe("Accounts controller", () => {
  let token;

  beforeEach(() => {
    token = `Bearer ${jwt.sign({
      type: "ADMIN",
      email: "admin@FileList.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" })}`;
  });

  describe("Testing Delete route", () => {
    const endpoint = "/api/v1/accounts/3008989879";
    it("should delete account with valid accountnumber is given", () => {
      chai.request(app).delete(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });
  });

  describe("delete", () => {
    describe("if parameters are correct", () => {
      const endpoint = "/api/v1/accounts/301898987";
      it("should not delete account once a wrong account number", () => {
        chai.request(app).delete(endpoint)
          .set("Authorization", token)
          .query({ accountnumber: 301898987 })
          .end((err, res) => {
            expect(res).to.have.status(200);
          });
      });
    });
  });

  // describe("Get all accounts", () => {
  //   const endpoint = "/api/v1/accounts";

  //   it("should get all user accounts", () => {
  //     chai.request(app)
  //       .get(endpoint)
  //       .set("Authorization", token)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //       });
  //   });
  // });
  describe("Find account by accountNumber", () => {
    const endpoint = `/api/v1/accounts/${3007235940}`;
    it("should get an account if the right account number is given", () => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });
  });
  describe("Find account by accountNumber", () => {
    const endpoint = `/api/v1/accounts/${897898987}`;
    it("should not get an account if the wrong account number is given", () => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
    });
  });
});
