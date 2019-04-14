import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";
import jwt from "jsonwebtoken";

chai.use(chaiHttp);

describe("Staff controller", () => {
  app;
  let token;

  beforeEach(() => {
    token = jwt.sign({
        type: "STAFF",
        email: "staff@FileList.com",
      }, 
      process.env.SECRET_KEY,
      { expiresIn: "7d" });
  }) 
  
  describe("Credit", () => {

    const endpoint = "/api/v1/3008989879/credit";
    const payload = {
      body: {
        accountNumber: 3008989879,
        amount: 1000,
      },
    };
    it("should credit a  user once the right account number is given", () => {
      chai.request(app)
        .post(endpoint)
        .set('Authorization', token)
        .send(payload.body) 
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(payload.body.accountNumber);
          expect(res.body.data.type).to.equal(payload.body.type);
        });
    });

    it("should not credit a  user once the wrong account number is given", () => {
      chai.request(app)
        .post(endpoint)
        .set('Authorization', token)
        .send({
          accountNumber: 300898989,
          amount: 1000,
        }) 
        .end((err, res) => {
          expect(res).to.have.status(404);
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
        .set('Authorization', token)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(payload.body.accountNumber);
          expect(res.body.data.transactionType).to.equal("debit");
        });
    });

    it("should not Debit a  user once the wrong account number is given", () => {
      chai.request(app)
        .post(endpoint)
        .set('Authorization', token)
        .send({
          accountNumber: 300898989,
          amount: 1000,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });
  });
});