import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);

describe("Admin controller", () => {
  describe("Activate", () => {
    const endpoint = `/api/v1/${3008989879}/activate`;
    const payload = {
      body: {
        status: "Active",
        accountNumber: 3008989879,
      },
    };
    it("should activate a user once the right account number is given", () => {
      chai.request(app).patch(endpoint)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).toBe(payload.body.accountNumber);
          expect(res.body.data.status).toBe(payload.body.status);
        });
    });
  });
  describe("Activate", () => {
    const endpoint = `/api/v1/${300898987}/deactivate`;
    it("should not deactivate a user once the wrong account number is given", () => {
      chai.request(app)
        .patch(endpoint, (err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });

  describe("Deativate", () => {
    const endpoint = `/api/v1/${3008989879}/deactivate`;
    const payload = {
      body: {
        status: "Active",
        accountNumber: 3008989879,
      },
    };
    it("should deactivate a user once the right account number is given", () => {
      chai.request(app).patch(endpoint).send(payload.body).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.accountNumber).toBe(payload.body.accountNumber);
        expect(res.body.data.status).toBe(payload.body.status);
      });
    });
  });
  describe("Deactivate", () => {
    const endpoint = `http://localhost:1500/api/v1/${300899879}/deactivate`;
    const payload = {
      json: true,
    };
    it("should not deactivate a user once the wrong account number is given", () => {
      chai.request.patch(endpoint).send(payload.body).end((err, res) => {
        expect(res).to.have.status(200);
      });
    });
  });
});
