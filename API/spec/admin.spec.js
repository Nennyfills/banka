/* eslint-disable no-undef */
import request from "request";
import app from "../app";


describe("Testing Admin controller", () => {
  app;
  describe("Activate", () => {
    const endpoint = "http://localhost:1500/api/v1/user/3008989879/activate";
    const payload = {
      json: true,
      body: {
        status: "Active",
        accountNumber: 3008989879,
      },
    };
    it("should activate a  user once the right account number is given", (done) => {
      request.put(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body.data.accountNumber).toBe(payload.body.accountNumber);
        expect(body.data.status).toBe(payload.body.status);
        done();
      });
    });
  });
  describe("Activate", () => {
    const endpoint = "http://localhost:1500/api/v1/user/300898987/activate";
    const payload = {
      json: true,
    };
    it("should not deactivate a user once the wrong account number is given", (done) => {
      request.put(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });

  describe("Deativate", () => {
    const endpoint = "http://localhost:1500/api/v1/user/3008989879/deactivate";
    const payload = {
      json: true,
      body: {
        status: "Dormant",
        accountNumber: 3008989879,
      },
    };
    it("should deactivate a user once the right account number is given", (done) => {
      request.put(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body.data.accountNumber).toBe(payload.body.accountNumber);
        expect(body.data.status).toBe(payload.body.status);
        done();
      });
    });
  });
  describe("Deactivate", () => {
    const endpoint = `http://localhost:1500/api/v1/user/300899879/deactivate`;
    const payload = {
      json: true,
    };
    it("should not deactivate a user once the wrong account number is given", (done) => {
      request.put(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });
});
