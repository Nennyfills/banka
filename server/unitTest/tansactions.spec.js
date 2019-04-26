import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);


describe("Transaction", () => {
  let token;
  beforeEach(() => {
    token = `Bearer ${jwt.sign({
      type: "USER",
      email: "canny@gmail.com",
      id: 4,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" })}`;
  });

  it("should view a user transaction with right acount number", (done) => {
    chai.request(app)
      .get(`/api/v1/${3008622723}/transactions`)
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should not view a user transaction with wrong acount number", (done) => {
    chai.request(app)
      .get(`/api/v1/${30898976}/transactions`)
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should view a user transaction with right id", (done) => {
    chai.request(app)
      .get(`/api/v1/transactions/${4}`)
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should not view a user transaction with wrong id", (done) => {
    chai.request(app)
      .get(`/api/v1/transactions/${100000190}`)
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it("User can search transaction by date", (done) => {
    chai.request(app)
      .get("/api/v1/transactions?startDate=2019-04-25&endDate=2019-04-26")
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
