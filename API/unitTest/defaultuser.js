import { expect, describe, it } from "jasmine";
import request from "request";
import server from "../app";

describe("Testing default controller", () => {
  // eslint-disable-next-line no-unused-expressions
  server;
  describe("Testing login", () => {
    const endpoint = "http://localhost:1500/api/v1/auth/login";
    const payload = {
      json: true,
    };
    it("should log in a user with correct email and password", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body.token).toBeDefined();
        done();
      });
    });
  });
  describe("Testing login", () => {
    const endpoint = "http://localhost:1500/api/v1/auth/login";
    const payload = {
    };
    it("should not login a user with wrong email and password", (done) => {
      request.post(endpoint, payload, (err, res) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });
});
