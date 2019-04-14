import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);

describe("Default controller", () => {
  describe("Testing login", () => {
    const endpoint = "http://localhost:1500/api/v1/auth/login";
    const payload = {
      json: true,
    };
    it("should log in a user with correct email and password", () => {
      chai.request(app).post(endpoint).send(payload).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).toBeDefined();
      });
    });
  });
  describe("Testing login", () => {
    const endpoint = "http://localhost:1500/api/v1/auth/login";
    const payload = {
    };
    it("should not login a user with wrong email and password", () => {
      chai.request(app).post(endpoint).send(payload).end((err, res) => {
        expect(res).to.have.status(404);
      });
    });
  });
});
