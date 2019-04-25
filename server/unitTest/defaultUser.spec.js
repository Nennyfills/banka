import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);

describe("Default controller", () => {
  describe("Testing login", () => {
    const endpoint = "/api/v1/auth/login";

    it("should log in a user with correct email and password", (done) => {
      chai.request(app).post(endpoint)
        .send({ email: "mark@hotmail.com", password: "love" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("token");
          done();
        });
    });

    it("should not login a user with wrong email and password", (done) => {
      chai.request(app)
        .post(endpoint)
        .send({ email: "mark@hotmail.com", password: "love2" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
