/* eslint-disable no-undef */
import Request from "request";
import server from "../app";

describe("'Testing User Controller", () => {
  describe("Testing signup", () => {
    const endpoint = "http://localhost:8000/api/v1/signup";
    const payload = {
      json: true,
      body: {
        type: "USER",
        email: "henry@gmail.com",
        firstName: "henry",
        surName: "wills",
        phoneNumber: "09087765654",
        password: "love",
      },
    };
    it("should register a new user when all the parameters are given", (done) => {
      Request.post(endpoint, payload, (err, res, body) => {
        expect(res.statusCode).toBe(201);
        expect(body.user.user.email).toBe(payload.body.email);
        expect(body.user.user.firstName).toBe(payload.body.firstName);
        expect(body.user.user.surName).toBe(payload.body.surName);
        expect(body.user.user.phoneNumber).toBe(payload.body.phoneNumber);
        expect(body.user.user.type).toBe(payload.body.type);
        expect(body.user.token).toBeDefined();
        done();
      });
    });
  });

  // it("This should register a new user when all the parameters are given", () => {
  //   expect(data.body).toBe("");
  // });
  // describe("GET /test", () => {
  //   const data = {};
  //   beforeAll((done) => {
  //     Request.get(localhost, (error, response, body) => {
  //       data.status = response.statusCode;
  //       data.body = JSON.parse(body);
  //       done();
  //     });
  //   });
  //   it("Status 200", () => {
  //     expect(data.status).toBe(500);
  //   });
  //   it("Body", () => {
  //     expect(data.body.message).toBe("This is an error response");
});
// });
