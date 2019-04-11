/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-undef */
// import Request from "request";
import request from "request";
// import expect from "expect";
import app from "../app";


describe("Testing User controller", () => {
  app;
  describe("Testing signup", () => {
    const endpoint = "http://localhost:1500/api/v1/user/signup";
    const payload = {
      json: true,
      body: {
        type: "USER",
        email: "henry@gmail.com",
        firstName: "henry",
        surName: "wills",
        password: "love",
      },
    };
    it("should register a new user once all the parameters are given", (done) => {
      request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(201);
        expect(body.user.user.email).toBe(payload.body.email);
        expect(body.user.user.firstName).toBe(payload.body.firstName);
        expect(body.user.user.surName).toBe(payload.body.surName);
        expect(body.user.user.type).toBe(payload.body.type);
        expect(body.user.token).toBeDefined();
        done();
      });
    });
  });

  describe("create account", () => {
    describe("if parameters are correct", () => {
      const endpoint = "http://localhost:1500/api/v1/user/account/create";
      const payload = {
        json: true,
        body: {
          firstName: "henery",
          surName: "hills",
          accountNumber: 300984857,
          type: "current",
          openingBalance: parseFloat(3989.40),
          email: "hills@mail.com",
          phoneNumber: "0909999890",
        },
      };
      it("should create account once all the parameters are given", (done) => {
        request.post(endpoint, payload, (err, res, body) => {
          expect(res.statusCode).toBe(201);
          expect(body.data.firstName).toBe(payload.body.firstName);
          expect(body.data.surName).toBe(payload.body.surName);
          expect(body.data.openingBalance).toBe(payload.body.openingBalance);
          expect(body.data.type).toBe(payload.body.type);
          expect(body.data.email).toBe(payload.body.email);
          expect(body.data.dob).toBe(payload.body.dob);
          expect(body.data.phoneNumber).toBe(payload.body.phoneNumber);
          done();
        });
      });
    });
    describe("shold not create account if all parameters are not giving", () => {
      const endpoint = "http://localhost:1500/api/v1/user/account/create";
     const payload = {
        json: true,
      };
      it("should not create a new account when the parameters are not given", (done) => {
        request.post(endpoint, payload, (err, res, body) => {
          expect(res.statusCode).toBe(400);
          console.log(body);
          expect(body.data).toBeUndefined();
          done();
        });
      });
    });
  });

  describe("view profile", () => {
    const endpoint = "http://localhost:1500/api/v1/user/3008989876/profile";
    const payload = {
      json: true,
    };
    it("should ", (done) => {
      request.get(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        // expect(body.data).toBe(payload.body.accountNumber);
        // console.log(body.data);
        done();
      });
    });
  });
});
