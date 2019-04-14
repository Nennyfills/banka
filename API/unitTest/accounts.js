import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import "@babel/polyfill";
import app from "../app";

chai.use(chaiHttp);

describe("Accounts controller", () => {
  describe("Testing Delete route", () => {
    const endpoint = `/api/v1/accounts/3008989879`;
    it("should delete account with valid accountnumber is given", () => {
      chai.request(app).delete(endpoint)
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });
  });

  describe("delete", () => {
    describe("if parameters are correct", () => {
      const endpoint = `/api/v1/accounts/3018989879`;
      it("should not delete account once a wrong account number is given", () => {
        chai.request(app).delete(endpoint)
          .query({ accountnumber: 3018989879 })
          .end((err, res) => {
            expect(res).to.have.status(404);
          });
      });
    });
  });

});
