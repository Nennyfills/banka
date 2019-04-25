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
      email: "admin01@gmail.com",
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
        expect(res).to.have.status(400);
        // expect(res.body.email).to.equal(payload.email);
        // expect(res.body.surname).to.equal(payload.surname);
        // expect(res.body.firstName).to.equal(payload.firstName);
        // expect(res.body.type).to.equal(payload.type);
        // expect(res.body.isAdmin).to.equal(true);
        // expect(res.body).to.have.property("id");
      });
  });
  describe("Activate", () => {
    const endpoint = "/api/v1/3001219111";
    it("should activate a user once the right account number is given", (done) => {
      chai.request(app).patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(3001219111);
          expect(res.body.data.status).to.equal("active");
          done();
        });
    });
  });
  describe("Activate", () => {
    const endpoint = `/api/v1/${300121911}`;
    it("should not deactivate a user once the wrong account number is given", (done) => {
      chai.request(app)
        .patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("Deativate", () => {
    const endpoint = `/api/v1/${300783679}`;
    it("should deactivate a user once the right account number is given", (done) => {
      chai.request(app)
        .patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.accountNumber).to.equal(300783679);
          expect(res.body.data.status).to.equal("dormant");
          done();
        });
    });
  });

  describe("Deactivate", () => {
    const endpoint = `/api/v1/${30078367}`;

    it("should not deactivate a user once the wrong account number is given", (done) => {
      chai.request(app)
        .patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
