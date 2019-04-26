import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);

describe("Post /auth/signup", () => {
  describe("User signup", () => {
    it("should register a new user once all the parameters are given", () => {
      const payload = {
        email: "joy2@westlife.com",
        firstName: "Joy",
        surname: "Fills",
        password: "love",
        isAdmin: "false",
        type: "USER",
        phonenumber: "08065534323",
      };

      chai.request(app)
        .post("/api/v1/auth/signup")
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.email).to.equal(payload.email);
          expect(res.body.data.surname).to.equal(payload.surname);
          expect(res.body.data.firstName).to.equal(payload.firstName);
          expect(res.body.data.phonenumber).to.equal(payload.phonenumber);
          expect(res.body.data.type).to.equal(payload.type);
          expect(res.body.data.isAdmin).to.equal(false);
          expect(res.body.data).to.have.property("password");
        });
    });
  });

  describe("User can create account", () => {
    let token;
    beforeEach(() => {
      token = `Bearer ${jwt.sign({
        type: "USER",
        email: "danny@gmail.com",
        id: 1,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;
    });

    const endpoint = "/api/v1/accounts";
    const payload = {
      json: true,
      body: {
        accountNumber: 3008622723,
      },
    };
    it("should create account once all the parameters are given", (done) => {
      chai.request(app)
        .post(endpoint)
        .set("Authorization", token)
        .send(payload.body)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.email).to.equal("danny@gmail.com");
          expect(res.body.data.accountnumber).to.equal(payload.body.accountNumber);
          expect(res.body.data.status).to.have.property("status");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("openingbalance");
          expect(res.body.data).to.have.property("type");
          done();
        });
    });
    it("should not create a new account when the parameters are not given", (done) => {
      chai.request(app)
        .post("/api/v1/accounts")
        .set("Authorization", token)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  describe("Home page and invalid router", () => {
    describe("Home page", () => {
      it("Should show page on this route '/' ", () => {
        chai.request(app)
          .get("/")
          .end((err, res) => {
            expect(res).to.have.status(200);
          });
      });
    });

    it("Should show page on this route '*' ", (done) => {
      chai.request(app)
        .get("/ap1/3")
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
