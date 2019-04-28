import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import app from "../app";

chai.use(chaiHttp);

describe("User signup", () => {
  it("should register a new user withput duplicate key value", (done) => {
    const payload = {
      email: "dannyoy@gmail.com",
      firstName: "Joy",
      surname: "Fills",
      password: "Love4@me",
      isAdmin: "false",
      type: "USER",
      phonenumber: "080695834323",
    };

    chai.request(app)
      .post("/api/v1/auth/signup")
      .send(payload)
      .end((err, res) => {
        console.log(res.body.data)
        expect(res).to.have.status(201);
        expect(res.body.data.surname).to.equal(payload.surname);
        expect(res.body.data.firstname).to.equal(payload.firstName);
        expect(res.body.data.phonenumber).to.equal(payload.phonenumber);
        expect(res.body.data.isadmin).to.equal(false);
        done();
      });
  });
  it("should not register a new user once required parameters are missing", (done) => {
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
        console.log(res.body.data);
        expect(res).to.have.status(409);
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
    it("should not create account once all the parameters are not given", (done) => {
      chai.request(app)
        .post(endpoint)
        .set("Authorization", token)
        .send(payload.body)
        .end((err, res) => {
          console.log(res.body.data);
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should not create a new account when the parameters are not given", (done) => {
      chai.request(app)
        .post("/api/v1/accounts")
        .set("Authorization", token)
        .send({})
        .end((err, res) => {
          console.log(res.body.data);     
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
    it("should not create staff or admin if required parameter are missing", (done) => {
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
        .post("/api/v1/auth/portal")
        .set("Authorization", token)
        .send(payload)
        .end((err, res) => {
          console.log(res.body.data);
          expect(res).to.have.status(409);
          done();
        });
      let header;
      beforeEach(() => {
        header = `Bearer ${jwt.sign({
          type: "STAFF",
          email: "strip@gmail.com",
        },
        process.env.SECRET_KEY,
          { expiresIn: "7d" })}`;
      });
      it.only(" Should get authorized if user not admin", () => {
        chai.request(app)
          .post("/api/v1/auth/portal")
          .set("Authorization", header)
          .send(payload)
          .end((err, res) => {
            console.log(res.body.data)
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("Firstname and surname is required  and must be an alphabet");
            done();
          });
      });
    });
    it("should get not found if current user not admin", (done) => {
      chai.request(app)
        .post("/api/v1/auth/portal")
        .set("Authorization", null)
        .send({})
        .end((err, res) => {
          console.log(res.body.data);
          expect(res).to.have.status(404);
          done();
        });
      it(" Should not create account with duplicate key value", (done) => {
        chai.request(app)
          .post("/api/v1/auth/portal")
          .set("Authorization", token)
          .send(payload)
          .end((err, res) => {
            console.log(res.body.data)
            expect(res).to.have.status(409);
            expect(res.body.message).to.equal("Firstname and surname is required  and must be an alphabet");
            done();
          });
      });
    });
    it("should not create account if duplicated key value are found", (done) => {
      const wrongToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMDJAZ21haWwuY29tIiwicGVybWlzc2lvbiI6IkFETUlOIiwiaWQiOjEzLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTY0MzQ3NjIsImV4cCI6MTU1NzAzOTU2Mn0.tgSQiQ4swbF0Ih0NH5G3lJoJ-1FLJf_eR6JJbV_5ASs"
      chai.request(app)
        .post("/api/v1/auth/portal")
        .set("Authorization", wrongToken)
        .send()
        .end((err, res) => {
          console.log(res.body, err);
          
          expect(res).to.have.status(400);
          done();
        });
    });
  });
  describe("Default controller", () => {
    describe("Testing login", () => {
      const endpoint = "/api/v1/auth/login";

      it("should log in a user with correct email and password", (done) => {
        chai.request(app).post(endpoint)
          .send({ email: "danny@gmail.com", password: "love" })
          .end((err, res) => {
            console.log(res.body.data);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("token");
            done();
          });
      });

      it("should not login a user with wrong email and password", (done) => {
        chai.request(app)
          .post(endpoint)
          .send({ email: "danny0@gmil.com", password: "love56" })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
    it("should not change password if not an exiting users", (done) => {
      chai.request(app)
        .get("/api/v1/profileimage")
        .send({ email: "danny56@gmil.com", password: "loO(8ve56" })
        .end((err, res) => {
          console.log(res.body.data);
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
