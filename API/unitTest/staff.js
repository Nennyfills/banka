import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);

describe("Staff controller", () => {
  // eslint-disable-next-line no-unused-expressions
  app;
  describe("Credit", () => {
    const endpoint = `/api/v1/${3008989879}/credit`;
    const payload = {
      body: {
        oldBalance: 31000.09,
        newBalance: 41009.09,
        accountNumber: 3008989879,
        cashier: 10000343,
        amount: 10009,
        id: 10000183046951,
        createdAt: "2019-04-12T10:54:32+01:00",
        type: "credit",
      },
    };
    it("should credit a  user once the right account number is given", () => {
      chai.request(app)
        .post(endpoint)
        .send(payload.body)
        .end((err, res, body) => {
          expect(res).to.have.status(200);
          expect(body.data.accountNumber).to.equal(payload.body.accountNumber);
          expect(body.data.cashier).to.equal(payload.body.cashier);
          expect(body.data.amount).to.equal(payload.body.amount);
          expect(body.data.transactionId).to.equal(payload.body.id);
        });
    });
  });
  describe("Credit", () => {
    const endpoint = `/api/v1/${300898987}/credit`;
    const payload = {
      json: true,
    };
    it("should not credit a  user once the wrong account number is given", () => {
      chai.request(app)
        .post(endpoint)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });

  describe("Debit", () => {
    const endpoint = `/api/v1${3008989879}debit`;
    const payload = {
      json: true,
      body: {
        oldBalance: 31000.09,
        newBalance: 41009.09,
        accountNumber: 3008989879,
        cashier: 10009,
        amount: 10009,
        id: 10000183046951,
        createdAt: "2019-04-12T10:54:32+01:00",
        type: "debit",
      },
    };
    it("should debit a  user once the right account number is given", () => {
      chai.request(app)
        .post(endpoint)
        .send(payload.body)
        .end((err, res, body) => {
          expect(res).to.have.status(200);
          expect(body.data.accountNumber).to.equal(payload.body.accountNumber);
          expect(body.data.cashier).to.equal(payload.body.cashier);
          expect(body.data.amount).to.equal(payload.body.amount);
          expect(body.data.accountId).to.equal(payload.body.accountId);
        });
    });
  });
  describe("Debit", () => {
    const endpoint = `/api/v1/${300898987}credit`;
    const payload = {
      json: true,
    };
    it("should not Debit a  user once the wrong account number is given", () => {
      chai.request(app)
        .post(endpoint)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });
});
