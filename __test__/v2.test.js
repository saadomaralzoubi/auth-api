"use strict";

process.env.SECRET = "toes";

const server = require("../auth/server");
const supertest = require("supertest");
const request = supertest(server.app);
const { db } = require("../auth/models/index");
let id;
let Users = {
  admin: { username: "admin", password: "password", role: "admin" },
  editor: { username: "editor", password: "password", role: "editor" },
  writer: { username: "writer", password: "password", role: "writer" },
  user: { username: "user", password: "password", role: "user" },
};
beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});
Object.keys(Users).forEach((element) => {
  describe("testing food model for v2 route", () => {
    it("post new food", async () => {
      let Auth = await request.post("/signup").send(Users[element]);
      let userToken = Auth.body.token;
      const response = await request
        .post("/api/v2/food")
        .send({
          foodName: "test",
          foodPopularity: "test",
        })
        .set("Authorization", `Bearer ${userToken}`);
      id = response.body.id;
      if (element === "writer" || element === "editor" || element === "admin") {
        expect(response.status).toBe(201);
      } else {
        expect(response.status).toBe(500);
      }
    });
    it("testing get all food", async () => {
      let Auth = await request
        .post("/signin")
        .auth(Users[element].username, Users[element].password);
      let userToken = Auth.body.token;
      const response = await request
        .get("/api/v2/food")
        .set("Authorization", `Bearer ${userToken}`);
      expect(response.status).toEqual(200);
    });
    it("testing get one food by id", async () => {
      let Auth = await request
        .post("/signin")
        .auth(Users[element].username, Users[element].password);
      let userToken = Auth.body.token;
      const response = await request
        .get(`/api/v2/food/${id}`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(response.status).toEqual(200);
    });

    it("update new food", async () => {
      let Auth = await request
        .post("/signin")
        .auth(Users[element].username, Users[element].password);
      let userToken = Auth.body.token;
      const response = await request
        .put(`/api/v2/food/${id}`)
        .send({
          foodName: "test1",
          foodPopularity: "test1",
        })
        .set("Authorization", `Bearer ${userToken}`);
      if (element == "editor" || element == "admin") {
        expect(response.status).toBe(201);
      } else {
        expect(response.status).toBe(500);
      }
    });

    it("deleting food by id", async () => {
      let Auth = await request
        .post("/signin")
        .auth(Users[element].username, Users[element].password);
      let userToken = Auth.body.token;
      const response = await request
        .delete(`/api/v2/food/${id}`)
        .set("Authorization", `Bearer ${userToken}`);

      if (Users[element].role === "admin") {
        expect(response.status).toBe(204);
      } else {
        expect(response.status).toBe(500);
      }
    });
  });
});
