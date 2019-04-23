import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);

describe("Staff controller", () => {
  let token;

  beforeEach(() => {
    token = `Bearer ${jwt.sign({
      type: "STAFF",
      email: "staff@FileList.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" })}`;
  });

  describe("Credit", () => {
    const endpoint = "/api/v1/4008989879/credit";
    const payload = {
      body: {
        accountNumber: 4008989879,
        amount: 1000,
        depositor: "nenye",
      },
    };
    it("should credit a  user once the right account number is given", () => {
      chai.request(app)
        .post(endpoint)
        .set("Authorization", token)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(payload.body.accountNumber);
          expect(res.body.data.amount).to.equal(payload.body.amount);
          expect(res.body.data.depositor).to.equal(payload.body.depositor);
        });
    });

    it("should not credit a user once the wrong account number is given", () => {
      chai.request(app)
        .post("/api/v1/30089898/credit")
        .set("Authorization", token)
        .send({
          amount: 1000,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });

  describe("Debit", () => {
    const endpoint = "/api/v1/3006993038/debit";
    const payload = {
      json: true,
      body: {
        amount: 500,
      },
    };
    it("should debit a  user once the right account number is given", () => {
      chai.request(app)
        .post(endpoint)
        .set("Authorization", token)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(3006993038);
          expect(res.body.data.transactionType).to.equal("debit");
        });
    });

    it("should not Debit a  user once the wrong account number is given", () => {
      chai.request(app)
        .post("/api/v1/300898987/credit")
        .set("Authorization", token)
        .send({
          amount: 1000,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });
});
