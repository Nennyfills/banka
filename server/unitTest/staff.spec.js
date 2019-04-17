import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);

describe("Staff controller", () => {
  let token;

  beforeEach(() => {
    token = jwt.sign({
      type: "STAFF",
      email: "staff@FileList.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" });
  });

  describe("Credit", () => {
    const endpoint = "/api/v1/4008989879/credit";
    const payload = {
      body: {
        accountNumber: 4008989879,
        amount: 1000,
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
        });
    });

    it("should not credit a user once the wrong account number is given", () => {
      chai.request(app)
        .post("/api/v1/30089898/credit")
        .set("Authorization", token)
        .send({
          amount: 1000,
          accountNumber: 30089898,
          cashierEmail: "staff@FileList.com",
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res).to.equal(30089898);
          expect(res).to.equal(1000);
          expect(res).to.equal("staff@FileList.com");
        });
    });
  });

  describe("Debit", () => {
    const endpoint = "/api/v1/3008989879/debit";
    const payload = {
      json: true,
      body: {
        accountNumber: 3008989879,
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
          expect(res.body.data.accountNumber).to.equal(payload.body.accountNumber);
          expect(res.body.data.transactionType).to.equal("debit");
        });
    });

    it("should not Debit a  user once the wrong account number is given", () => {
      chai.request(app)
        .post("/api/v1/300898987/credit")
        .set("Authorization", token)
        .send({
          accountNumber: 300898987,
          amount: 1000,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });
});
