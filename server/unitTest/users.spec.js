import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);

describe("User signup", () => {
  it("should not register a new user with duplicate key value", (done) => {
    const payload = {
      email: "dannyoy@gmail.com",
      firstName: "Joy",
      surname: "Fills",
      password: "love",
      isAdmin: "false",
      type: "USER",
      phonenumber: "08065834323",
    };

    chai.request(app)
      .post("/api/v1/auth/signup")
      .send(payload)
      .end((err, res) => {
        console.log(res.body.data, "user 1");
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("duplicate key value violates unique constraint \"users_pkey\"");
        done();
        // expect(res.body.data.surname).to.equal(payload.surname);
        // expect(res.body.data.firstName).to.equal(payload.firstName);
        // expect(res.body.data.phonenumber).to.equal(payload.phonenumber);
        // expect(res.body.data.type).to.equal(payload.type);
        // expect(res.body.data.isAdmin).to.equal(false);
        // expect(res.body.data).to.have.property("password");
      });
  });
  it("should register a new user once all the parameters are given", (done) => {
    const payload = {
      email: "dannyboy@gmail.com",
      firstName: "Joy",
      surname: "Fills",
      password: "love",
      isAdmin: "false",
      type: "USER",
      phonenumber: "08065834323",
    };
    chai.request(app)
      .post("/api/v1/auth/signup")
      .send(payload)
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("account created");
        expect(res.body).to.have.property("data");
        done();
      });
  });
  describe("User can create account", () => {
    let token;
    beforeEach(() => {
      token = `Bearer ${jwt.sign({
        type: "USER",
        email: "dannyboy@gmail.com",
        id: 2,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;
    });

    const endpoint = "/api/v1/accounts";
    const payload = {
      json: true,
      body: {
        accountNumber: 3008622723,
        openingbalance: 589999,
        type: "save",
      },
    };
    it("should create account once all the parameters are given", (done) => {
      chai.request(app)
        .post(endpoint)
        .set("Authorization", token)
        .send(payload.body)
        .end((err, res) => {
          console.log(res.body, "create 1");
          expect(res).to.have.status(201);
          // expect(res.body.data.email).to.equal("danny@gmail.com");
          // expect(res.body.data.accountnumber).to.equal(payload.body.accountNumber);
          // expect(res.body.data.status).to.have.property("status");
          // expect(res.body.data).to.have.property("id");
          // expect(res.body.data).to.have.property("openingbalance");
          // expect(res.body.data).to.have.property("type");
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
    it("should create staff or admin once all the parameters are given", (done) => {
      const payload = {
        email: "strip@gmail.com",
        firstName: "Joy",
        surname: "dills",
        password: "love",
        isAdmin: "true",
        type: "STAFF",
        phonenumber: "0908767546",
      };

      chai.request(app)
        .post("/api/v1/auth/admin-portal")
        .set("Authorization", token)
        .send(payload)
        .end((err, res) => {
          console.log(res.body, "create 2");
          expect(res).to.have.status(201);
          expect(res.body.email).to.equal(payload.email);
          expect(res.body.surname).to.equal(payload.surname);
          expect(res.body.firstName).to.equal(payload.firstName);
          expect(res.body.phonenumber).to.equal(payload.phonenumber);
          expect(res.body.type).to.equal(payload.type);
          expect(res.body.isAdmin).to.equal(true);
          expect(res.body).to.have.property("id");
          done();
        });
      it(" Should not create account with duplicate key value", () => {
        chai.request(app)
          .post("/api/v1/auth/admin-portal")
          .set("Authorization", token)
          .send(payload)
          .end((err, res) => {
            console.log(res.body, "create 3");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("duplicate key value violates unique constraint users_pkey");
            done();
          });
      });
    });
    it("should not create account if duplicated key value are found", (done) => {
      chai.request(app)
        .post("/api/v1/auth/portal")
        .set("Authorization", token)
        .send()
        .end((err, res) => {
          console.log(res.body, "create 4");
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("Illegal arguments undefined string");
          done();
        });
    });
  });
  describe("Default controller", () => {
    describe("Testing login", () => {
      const endpoint = "/api/v1/auth/login";

      it("should log in a user with correct email and password", (done) => {
        chai.request(app).post(endpoint)
          .send({ email: "canny@gmail.com", password: "love" })
          .end((err, res) => {
            console.log(res.body, "default 2");
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("token");
            done();
          });
      });

      it("should not login a user with wrong email and password", (done) => {
        chai.request(app)
          .post(endpoint)
          .send({ email: "mark@hotmail.com", password: "love2" })
          .end((err, res) => {
            console.log(res.body, "default 2");

            expect(res).to.have.status(400);
            done();
          });
      });
    });
  });
});
