import { expect, describe, it } from "jasmine";
import "@babel/polyfill";
import request from "request";
import server from "../app";


describe("Testing Accounts controller", () => {
  server;
  describe("Testing Delete route", () => {
    const endpoint = `http://localhost:1500/api/v1/${3008989879}`;
    const payload = {
      json: true,
      body: {
        accountNumber: 3008989879,
      },
    };
    it("should not delete account once the account number wrong is given", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(201);
        expect(body.data.accountNumber).toBe(payload.body.accountNumber);
        done();
      });
    });
  });

  describe("create delete", () => {
    describe("if parameters are correct", () => {
      const endpoint = `http://localhost:1500/api/v1/${3008989879}`;
      const payload = {
        json: true,
      };
      it("should not delete account once the account number wrong is given", (done) => {
        request.post(endpoint, payload, (err, res, body) => {
          expect(res.statusCode).toBe(404);
          done();
        });
      });
    });
  });
});
