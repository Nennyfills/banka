import { expect, describe, it } from "jasmine";
import request from "request";
import server from "../app";


describe("Testing Staff controller", () => {
  // eslint-disable-next-line no-unused-expressions
  server;
  describe("Credit", () => {
    const endpoint = `http://localhost:1500/api/v1/${3008989879}/credit`;
    const payload = {
      json: true,
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
    it("should credit a  user once the right account number is given", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body.data.accountNumber).toBe(payload.body.accountNumber);
        expect(body.data.cashier).toBe(payload.body.cashier);
        expect(body.data.amount).toBe(payload.body.amount);
        expect(body.data.transactionId).toBe(payload.body.id);
        done();
      });
    });
  });
  describe("Credit", () => {
    const endpoint = `http://localhost:1500/api/v1/${300898987}/credit`;
    const payload = {
      json: true,
    };
    it("should not credit a  user once the wrong account number is given", (done) => {
      request.post(endpoint, payload, (err, res) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });

  describe("Debit", () => {
    const endpoint = `http://localhost:1500/api/v1${3008989879}debit`;
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
    it("should debit a  user once the right account number is given", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body.data.accountNumber).toBe(payload.body.accountNumber);
        expect(body.data.cashier).toBe(payload.body.cashier);
        expect(body.data.amount).toBe(payload.body.amount);
        expect(body.data.accountId).toBe(payload.body.accountId);
        done();
      });
    });
  });
  describe("Debit", () => {
    const endpoint = `http://localhost:1500/api/v1/${300898987}credit`;
    const payload = {
      json: true,
    };
    it("should not Debit a  user once the wrong account number is given", (done) => {
      request.post(endpoint, payload, (err, res) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });
});
