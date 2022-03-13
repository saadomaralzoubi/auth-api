"use strict";
const server = require("../auth/server");
const supertest = require("supertest");
const request = supertest(server.app);

describe("testing 404", () => {
  it("testing /person", async () => {
    const response = await request.get("/foo");
    expect(response.status).toEqual(404);
  });

  it("testing bad method", async () => {
    const response = await request.post("/");
    expect(response.status).toEqual(404);
  });
});
