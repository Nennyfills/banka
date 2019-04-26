import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);

describe("Staff controller", () => {
  let token;

  beforeEach(() => {
    token = `Bearer ${jwt.sign({
      type: "STAFF",
      email: "staff01@gmail.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" })}`;
  });

  describe("Credit", () => {
    const endpoint = `/api/v1/${3008180416}/credit`;
    const payload = {
      body: {
        accountNumber: 3008180416,
        amount: 16896,
        depositor: "nenye",
      },
    };
    it("should credit a user once the right account number is given", (done) => {
      chai.request(app)
        .post(endpoint)
        .set("Authorization", token)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(payload.body.accountNumber);
          expect(res.body.data.amount).to.equal(payload.body.amount);
          expect(res.body.data.depositor).to.equal(payload.body.depositor);
          done();
        });
    });

    it("should not credit a user once the wrong account number is given", (done) => {
      chai.request(app)
        .post(`/api/v1/${3008898}/credit`)
        .set("Authorization", token)
        .send({
          amount: 16896,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("Debit", () => {
    const endpoint = `/api/v1/${3008180416}/debit`;
    const payload = {
      json: true,
      body: {
        amount: 500,
        depositor: "N/A",
      },
    };
    it("should debit a  user once the right account number is given", (done) => {
      chai.request(app)
        .post(endpoint)
        .set("Authorization", token)
        .send(payload.body)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(200);
          expect(res.body.data).to.have.property("depositor");
          expect(res.body.data.accountNumber).to.equal(3008180416);
          expect(res.body.data.transactionType).to.equal("debit");
          done();
        });
    });

    it("should not Debit a  user once the wrong account number is given", (done) => {
      chai.request(app)
        .post(`/api/v1/${30089987}/credit`)
        .set("Authorization", token)
        .send({
          amount: 1000,
        })
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.property(status);
          done();
        });
    });
  });
});
