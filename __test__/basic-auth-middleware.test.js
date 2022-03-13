"use strict";

const basicAuth = require("../auth/middleware/basicAuth");
const { db, user } = require("../auth/models/index");

let userInfo = {
  admin: { username: "admin-basic", password: "password" },
};

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe("Auth Middleware", () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe("user authentication", () => {
    it("fails a login for a user (admin) with the incorrect basic credentials", () => {
      req.headers = {
        authorization: "Basic YWRtaW46Zm9v",
      };

      return basicAuth(req, res, next).then(() => {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(403);
      });
    });

    it("logs in an admin user with the right credentials", () => {
      req.headers = {
        authorization: "Basic YWRtaW46cGFzc3dvcmQ=",
      };

      return basicAuth(req, res, next).then(() => {
        expect(next).not.toHaveBeenCalledWith();
      });
    });
  });
});
