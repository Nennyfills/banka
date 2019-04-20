import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);


describe("Transaction by account number", () => {
  let token;
  beforeEach(() => {
    token = `Bearer ${jwt.sign({
      type: "USER",
      email: "joy@westlife.com",
      id: 1000001,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" })}`;
  });

  it("should view a user transaction with right acount number", () => {
    chai.request(app)
      .get(`/api/v1/${3008989879}/transactions`)
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("should not view a user transaction with wrong acount number", () => {
    chai.request(app)
      .get(`/api/v1/${30089898976}/transactions`)
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
  });
  it("should view a user transaction with right id", () => {
    chai.request(app)
      .get(`/api/v1/transactions/${1000001}`)
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
  });

  it("should not view a user transaction with wrong id", () => {
    chai.request(app)
      .get(`/api/v1/transactions/${100000190}`)
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
  });
});
