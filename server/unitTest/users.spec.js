import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import jwt from "jsonwebtoken";
import { log } from "core-js";
import app from "../app";

chai.use(chaiHttp);

describe("User signup", () => {
  it("should register a new user if email already exist", (done) => {
    const payload = {
      email: "dannyoy@gmail.com",
      firstname: "Joy",
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
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should not register a new user once required parameters are missing", (done) => {
    const payload = {
      email: "dannyboy@gmail.com",
      firstname: "Joy",
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
        expect(res).to.have.status(400);
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
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should not allow a staff or admin create an account", (done) => {
      const tokenS = `Bearer ${jwt.sign({
        type: "STAFF",
        email: "staff01@gmail.com",
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;
      chai.request(app).post("/api/v1/accounts")
        .set("Authorization", tokenS)
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(403);
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
    let payload;
    beforeEach(() => {
      token = `Bearer ${jwt.sign({
        type: "ADMIN",
        email: "admin01@gmail.com",
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;

      payload = {
        email: "strip@gmail.com",
        firstname: "Joy",
        surname: "dills",
        password: "Love12$3",
        isAdmin: "true",
        type: "STAFF",
        phonenumber: "0908767546",
      };
    });
    it("should not create staff or admin if required parameter are missing", (done) => {
      chai.request(app)
        .post("/api/v1/auth/portal")
        .set("Authorization", token)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it(" Should get authorized if user not admin", (done) => {
      token = `Bearer ${jwt.sign({
        type: "STAFF",
        email: "admin01@gmail.com",
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;

      chai.request(app)
        .post("/api/v1/auth/portal")
        .set("Authorization", token)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should not create account if required keys are not found", (done) => {
      token = `Bearer ${jwt.sign({
        type: "ADMIN",
        email: "admin01@gmail.com",
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;
      chai.request(app)
        .post("/api/v1/auth/portal")
        .set("Authorization", token)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should not create account if currentuser is not an admin", (done) => {
      token = `Bearer ${jwt.sign({
        type: "STAFF",
        email: "staff01@gmail.com",
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;
      chai.request(app)
        .post("/api/v1/auth/portal")
        .set("Authorization", token)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
    it(" Should not create account with duplicate key value", (done) => {
      chai.request(app)
        .post("/api/v1/auth/portal")
        .set("Authorization", token)
        .send(payload)
        .end((err, res) => {
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
          .send({ email: "canny@gmail.com", password: "love" })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
      it("should not login a user with wrong email and password", (done) => {
        chai.request(app)
          .post("/api/v1/resetpassword")
          .send({ email: "danny0@gmil.com", password: "love56" })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
    it("should not change password if not an exiting users", (done) => {
      chai.request(app)
        .post("/api/v1/resetpassword")
        .send({ email: "danny56@gmil.com", password: "loO(8ve56" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should not change password if password dont meet the password standard", (done) => {
      const token = `Bearer ${jwt.sign({
        type: "USER",
        email: "danny@gmil.com",
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;
      chai.request(app)
        .post("/api/v1/resetpassword")
        .set("Authorization", token)
        .send({ email: "danny@gmil.com" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should not change password if password dont meet the password standard", (done) => {
      chai.request(app)
        .post("/api/v1/resetpassword")
        .send({ email: "Wills@gmail.com", password: "love" })
        .end((err, res) => {
          console.log(res.body);
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should upload image if is an exiting user", (done) => {
      const token = `Bearer ${jwt.sign({
        type: "USER",
        email: "canny@gmail.com",
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;
      chai.request(app)
        .put("/api/v1/profileimage/save")
        .set("Authorization", token)
        .send({ email: "canny@gmail.com", password: "love" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it("should not upload image if is not exiting user", (done) => {
      const token = `Bearer ${jwt.sign({
        type: "USER",
        email: "canny@gmail.com",
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" })}`;
      chai.request(app)
        .put("/api/v1/profileimage/save")
        .set("Authorization", token)
        .send({ email: "canny09@gmail.com", password: "liove" })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it("should not upload image if is not exiting user", (done) => {
      chai.request(app)
        .put("/api/v1/profileimage/save")
        .send({ email: "canny@gmail.com", password: "love" })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
