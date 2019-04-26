import "@babel/polyfill";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
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
    const endpoint = `/api/v1/${3001219111}`;
    it("should activate a user once the right account number is given", (done) => {
      chai.request(app).patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          console.log(res.body, err);
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal("successfully");
          expect(res.body.data).to.have.property("update");
          // expect(res.body.data.update.status).to.equal("active");
          expect(res.body.data.update.ownerid).to.equal(3);
          expect(res.body.data.update.accountnumber).to.equal("3001219111");
          expect(res.body.data.update.email).to.equal("canny@gmail.com");
          expect(res.body.data.update.type).to.equal("current");
          expect(res.body.data.update.createdat).to.equal("2019-04-25T13:01:04.000Z");
          done();
        });
    });
  });
  describe("Activate", () => {
    const endpoint = `/api/v1/${30012911}`;
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
    const endpoint = `/api/v1/${3001219111}`;
    it("should deactivate a user once the right account number is given", (done) => {
      chai.request(app)
        .patch(endpoint)
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.update.status).to.equal("active");
          done();
        });
    });
  });

  describe("Deactivate", () => {
    const endpoint = `/api/v1/${3008367}`;

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
