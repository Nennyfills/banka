/* eslint-disable no-undef */
import request from "request";
import app from "../app";


describe("Testing Staff controller", () => {
  app;
  describe("Credit", () => {
    const endpoint = "http://localhost:1500/api/v1/user/transactions/credit";
    const payload = {
      json: true,
      body: {
        oldBalance: 31000.09,
        newBalance: 20991.09,
        accountNumber: 3008989879,
        cashier: 10000343,
        amount: 10009,
        accountId: 10000183046951,
        createdAt: "2019-04-12T10:54:32+01:00",
      },
    };
    it("should credit a  user once the right account number is given", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body.data.accountNumber).toBe(payload.body.accountNumber);
        expect(body.data.cashier).toBe(payload.body.cashier);
        expect(body.data.oldBalance).toBe(payload.body.oldBalance);
        expect(body.data.newBalance).toBe(payload.body.newBalance);
        expect(body.data.amount).toBe(payload.body.amount);
        expect(body.data.accountId).toBe(payload.body.accountId);
        expect(body.data.createdAt).toBe(payload.body.createdAt);
        done();
      });
    });
  });
  describe("Credit", () => {
    const endpoint = "http://localhost:1500/api/v1/user/transactions/credit";
    const payload = {
      json: true,
    };
    it("should not credit a  user once the right account number is given", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });
  describe("Debit", () => {
    const endpoint = "http://localhost:1500/api/v1/user/transactions/debit";
    const payload = {
      json: true,
      body: {
        oldBalance: 31000.09,
        newBalance: 41009.09,
        accountNumber: 3008989879,
        cashier: 10000343,
        amount: 10009,
        accountId: 10000183046951,
        createdAt: "2019-04-12T10:54:32+01:00",
      },
    };
    it("should debit a  user once the right account number is given", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body.data.accountNumber).toBe(payload.body.accountNumber);
        expect(body.data.cashier).toBe(payload.body.cashier);
        expect(body.data.oldBalance).toBe(payload.body.oldBalance);
        expect(body.data.newBalance).toBe(payload.body.newBalance);
        expect(body.data.amount).toBe(payload.body.amount);
        expect(body.data.accountId).toBe(payload.body.accountId);
        expect(body.data.createdAt).toBe(payload.body.createdAt);
        done();
      });
    });
  });
  describe("Debit", () => {
    const endpoint = "http://localhost:1500/api/v1/user/transactions/credit";
    const payload = {
      json: true,
    };
    it("should not Debit a  user once the wrong account number is given", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });
});
