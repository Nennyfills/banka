import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);

describe("Admin controller", () => {
  let token;
  beforeEach(() => {
    token = jwt.sign({
      type: "ADMIN",
      email: "admin@FileList.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" });
  });
  describe("Activate", () => {
    const endpoint = "/api/v1/4008989879";
    it("should activate a user once the right account number is given", () => {
      chai.request(app).patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(4008989879);
          expect(res.body.data.status).to.equal("active");
        });
    });
  });
  describe("Activate", () => {
    const endpoint = `/api/v1/${300898987}`;
    it("should not deactivate a user once the wrong account number is given", () => {
      chai.request(app)
        .patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });

  describe("Deativate", () => {
    const endpoint = `/api/v1/${3008989871}`;
    it("should deactivate a user once the right account number is given", () => {
      chai.request(app)
        .patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(3008989871);
          expect(res.body.data.status).to.equal("dormant");
        });
    });
  });

  describe("Deactivate", () => {
    const endpoint = `/api/v1/${300898987}`;

    it("should not deactivate a user once the wrong account number is given", () => {
      chai.request(app)
        .patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });
});
