import chai, { expect } from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";
import { exec } from "child_process"

chai.use(chaiHttp);
describe("Accounts controller", () => {
  let token = null;

  beforeEach(() => {
    token = `Bearer ${jwt.sign({
      type: "ADMIN",
      email: "admin01@gmail.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" })}`;
  });

  describe("Testing Delete route", () => {
    const endpoint = `/api/v1/accounts/${30078367}`;
    
    it("should not delete account once a wrong account number is given", (done) => {
      chai.request(app).delete(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    }).timeout(10000);
  });

  describe("delete", () => {
    describe("if parameters are correct", () => {
      const endpoint = "/api/v1/accounts/3007405577";
      it("should delete account with valid accountnumber is given", (done) => {
        chai.request(app).delete(endpoint)
          .set("Authorization", token)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });

  describe("Get all accounts", () => {
    const endpoint = "/api/v1/accounts";

    it("should get all user accounts", (done) => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe("Find account by accountNumber", () => {
    const endpoint = `/api/v1/accounts/${3001219111}`;
    it("should get an account if the right account number is given", (done) => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe("Find account by accountNumber", () => {
    const endpoint = `/api/v1/accounts/${89789898}`;
    it("should not get an account if the wrong account number is given", (done) => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe("Find account by email", () => {
    it("should not get an account if the wrong email is give", (done) => {
      chai.request(app)
        .get("/api/v1/user/cnny@gmail.com/accounts")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("given should get an account if the right email is given", (done) => {
      chai.request(app)
        .get("/api/v1/user/canny@gmail.com/accounts")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
