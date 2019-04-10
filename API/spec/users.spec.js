/* eslint-disable no-undef */
import Request from "request";
import server from "../app";


describe("Testing signup", () => {
  const endpoint = "http://localhost:7000/api/v1/user/signup";
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
  it("should register a new user when all the parameters are given", (done) => {
    Request.post(endpoint, payload, (err, res, body) => {
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
  const endpoint = "http://localhost:7000/api/v1/user/accounts/create";
  const payload = {
    json: true,
    body: {
      firstName: "henery",
      surName: "hills",
      accountNumber: 300984857,
      type: "current",
      openingBalance: parseFloat(3989.40),
    },
  };
  it("should register a new user when all the parameters are given", (done) => {
    Request.post(endpoint, payload, (err, res, body) => {
      expect(res.statusCode).toBe(201);
      expect(body.data.data.firstName).toBe(payload.body.firstName);
      expect(body.data.data.surName).toBe(payload.body.surName);
      expect(body.data.data.openingBalance).toBe(payload.body.openingBalance);
      expect(body.data.data.type).toBe(payload.body.type);
      expect(body.data.data.accountNumber).toBeDefined(payload.body.accountNumber);
      done();
    });
  });
  
});
