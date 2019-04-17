import chai, { expect } from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import { doesNotReject } from "assert";
import app from "../app";

const should = chai.should();
chai.use(chaiHttp);

describe("Accounts controller", () => {
  let token;

  beforeEach(() => {
    token = jwt.sign({
      type: "STAFF",
      email: "staff@FileList.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" });
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
      const endpoint = "/api/v1/accounts/3018989879";
      it("should not delete account once a wrong account number is given", () => {
        chai.request(app).delete(endpoint)
          .set("Authorization", token)
          .query({ accountnumber: 3018989879 })
          .end((err, res) => {
            expect(res).to.have.status(404);
          });
      });
    });
  });

  describe("Profile", () => {
    const endpoint = `/api/v1/${3008989876}/profile`;
    it("should view a user profile with right acount number", () => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {          
          expect(res).to.have.status(200);
        });
    });
  });
  describe("Profile", () => {
    const endpoint = `/api/v1/${300898987}/profile`;
    it("should not view a user profile with wrong acount number", () => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
    });
  });
  describe("Get all accounts", () => {
    const endpoint = "/api/v1/accounts";

    it("should get all user  accounts", () => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {          
          expect(res).to.have.status(200);
        });
    });
  });
});
