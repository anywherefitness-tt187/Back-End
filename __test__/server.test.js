const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");

beforeAll(() => {
  db("users").truncate();
});

describe("server.js", () => {
  test("make sure Server.js is working", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("GET /", () => {
  test("Returns 200", () => {
    return request(server)
      .get("/")
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});

describe("GET /api/users without a token", () => {
  test("Returns unauth message", () => {
    return request(server)
      .get("/api/users")
      .then((res) => {
        expect(res.body.message).toBe("Unauthorized access, please sign in");
      });
  });
});

describe("Test registration", () => {
  test("Status 201", () => {
    return request(server)
      .post("/api/auth/register")
      .send({ username: "MrKrabs", password: "moneymoney", role: "client" })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
});
