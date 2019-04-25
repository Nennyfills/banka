import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);

describe("Admin controller", () => {
  let token;
  beforeEach(() => {
    token = `Bearer ${jwt.sign({
      type: "ADMIN",
      email: "admin@FileList.com",
    },
    process.env.SECRET_KEY,
    { expiresIn: "7d" })}`;
       
  });
  it("should create staff or admin once all the parameters are given", () => {
    const payload = {
      email: "staff2@FileList.com",
      firstName: "Joy",
      surname: "dills",
      password: "love",
      isAdmin: "true",
      type: "STAFF",
    };

    chai.request(app)
      .post("/api/v1/auth/portal")
      .set("Authorization", token)
      .send(payload)
      .end((err, res) => {        
        expect(res).to.have.status(201);
        expect(res.body.data.email).to.equal(payload.email);
        expect(res.body.data.surname).to.equal(payload.surname);
        expect(res.body.data.firstName).to.equal(payload.firstName);
        expect(res.body.data.isAdmin).to.equal(true);
        expect(res.body.data).to.have.property("id");
      });
  });
  describe("Activate", () => {
    const endpoint = "/api/v1/3006993038";
    it("should activate a user once the right account number is given", () => {
      chai.request(app).patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(3006993038);
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
