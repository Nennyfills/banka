import chai, { expect } from "chai";
import jwt from "jsonwebtoken";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);
describe("Accounts controller", () => {
  let token = null;

  beforeEach(() => {
    token = `Bearer ${jwt.sign({
      type: "ADMIN",
      email: "admin01@gmail.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" })}`;
  });

  describe("Testing Delete route", () => {
    const endpoint = `/api/v1/accounts/${30078367}`;

    it("should not delete account once a wrong account number is given", (done) => {
      chai.request(app).delete(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    }).timeout(10000);
  });

  describe("delete", () => {
    describe("if parameters are correct", () => {
      const endpoint = "/api/v1/accounts/3007405577";
      it("should delete account with valid accountnumber is given", (done) => {
        chai.request(app).delete(endpoint)
          .set("Authorization", token)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });

  describe("Get all accounts", () => {
    const endpoint = "/api/v1/accounts";

    it("should get all user accounts", (done) => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe("Find account by accountNumber", () => {
    const endpoint = `/api/v1/accounts/${3001219111}`;
    it("should get an account if the right account number is given", (done) => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe("Find account by accountNumber", () => {
    const endpoint = `/api/v1/accounts/${89789898}`;
    it("should not get an account if the wrong account number is given", (done) => {
      chai.request(app)
        .get(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe("Find account by email", () => {
    it("should not get an account if the wrong email is give", (done) => {
      chai.request(app)
        .get("/api/v1/user/cnny@gmail.com/accounts")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("given should get an account if the right email is given", (done) => {
      chai.request(app)
        .get("/api/v1/user/canny@gmail.com/accounts")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe("Staff controller", () => {
  let token;

  beforeEach(() => {
    token = `Bearer ${jwt.sign({
      type: "STAFF",
      email: "staff01@gmail.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" })}`;
  });

  describe("Credit", () => {
    const endpoint = `/api/v1/${3008180416}/credit`;
    const payload = {
      body: {
        accountNumber: 3008180416,
        amount: 16896,
        depositor: "nenye",
        id: 5,
      },
    };
    it("should not credit account if depositor Required", (done) => {
      chai.request(app)
        .post(endpoint)
        .set("Authorization", token)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should not credit a user once the wrong account number is given", (done) => {
      chai.request(app)
        .post(`/api/v1/${3008898}/credit`)
        .set("Authorization", token)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("Staff controller", () => {
    beforeEach(() => {
      token = `Bearer ${jwt.sign({
        type: "ADMIN",
        email: "admin01@gmail.com",
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;
    });

    describe("Credit", () => {
      const endpoint = `/api/v1/${3008180416}/credit`;
      const payload = {
        body: {
          accountNumber: 3008180416,
          amount: 16896,
          depositor: "nenye",
          id: 5,
        },
      };
      it("should not credit a user if not staff", (done) => {
        chai.request(app)
          .post(endpoint)
          .set("Authorization", token)
          .send(payload.body)
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
      });

      it("should not find user if not staff", (done) => {
        chai.request(app)
          .post(`/api/v1/${3008898}/credit`)
          .set("Authorization", null)
          .send(payload.body)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });

    describe("Debit", () => {
      beforeEach(() => {
        token = `Bearer ${jwt.sign({
          type: "STAFF",
          email: "staff01@gmail.com",
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" })}`;
      });
      const endpoint = `/api/v1/${3008180416}/debit`;
      const payload = {
        json: true,
        body: {
          amount: 500,
          depositor: "N/A",
        },
      };
      it("should not debit account if account is dormant", (done) => {
        chai.request(app)
          .post(endpoint)
          .set("Authorization", token)
          .send(payload.body)
          .end((err, res) => {
            expect(res.body.message).to.equal("Account Dormant");
            done();
          });
      });

      it("should debit a user if all parameters are correct", (done) => {
        chai.request(app)
          .post(`/api/v1/${3008622723}/debit`)
          .set("Authorization", token)
          .send({
            amount: 500,
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
    describe(" Admin", () => {
      let adminToken;
      beforeEach(() => {
        adminToken = `Bearer ${jwt.sign({
          type: "ADMIN",
          email: "admin01@gmail.com",
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" })}`;
      });

      describe("Activate", () => {
        it("should activate a user once the right account number is given", (done) => {
          chai.request(app).patch(`/api/v1/${3001219111}`)
            .set("Authorization", adminToken)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.message).to.equal("successfully");

              done();
            });
        });
      });
      describe("Activate", () => {
        it("should not deactivate a user once the wrong account number is given", (done) => {
          chai.request(app)
            .patch(`/api/v1/${30012911}`)
            .set("Authorization", adminToken)
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
        });
      });

      describe("Deativate", () => {
        it("should deactivate a user once the right account number is given", (done) => {
          chai.request(app)
            .patch(`/api/v1/${3001219111}`)
            .set("Authorization", adminToken)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.data.update.status).to.equal("active");
              done();
            });
        });
      });

      describe("Deactivate", () => {
        it("should not deactivate a user once the wrong account number is given", (done) => {
          chai.request(app)
            .patch(`/api/v1/${3008367}`)
            .set("Authorization", adminToken)
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
        });
      });
    });
  });
});
