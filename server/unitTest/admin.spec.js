import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);

describe("Admin controller", () => {
  describe("Activate", () => {
    const endpoint = "/api/v1/4008989879";
    it("should activate a user once the right account number is given", () => {
      chai.request(app).patch(endpoint)
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
        .patch(endpoint, (err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });

  describe("Deativate", () => {
    const endpoint = `/api/v1/${3008989879}`;
    it("should deactivate a user once the right account number is given", () => {
      chai.request(app)
        .patch(endpoint)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(3008989879);
          expect(res.body.data.status).to.equal("dormant");
        });
    });
  });

  describe("Deactivate", () => {
    const endpoint = `/api/v1/${300898987}`;
    const payload = {
      json: true,
    };
    it("should not deactivate a user once the wrong account number is given", () => {
      chai.request(app).patch(endpoint).send(payload.body).end((err, res) => {
        expect(res).to.have.status(404);
      });
    });
  });
});
