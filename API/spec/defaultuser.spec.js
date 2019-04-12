import request from "request";
import app from "../app";


describe("Testing default controller", () => {
  app;
  describe("Testing login", () => {
    const endpoint = "http://localhost:1500/api/v1/user/login";
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
    const endpoint = "http://localhost:1500/api/v1/user/login";
    const payload = {
    };
    it("should not login a user with wrong email and password", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(404);
        done();
      });
    });
  });
});
