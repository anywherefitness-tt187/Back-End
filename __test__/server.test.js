const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");
const bcryptjs = require("bcryptjs");

let token = null;

const newClass = {
  class_name: "Newclass",
  class_type: "Swimming",
  class_intensity: "Hard",
  class_location: "Underthesea",
  start_time: "Tomorrow",
  class_duration: "1hr",
  class_max_size: "23",
};

const updatedClass = {
  class_name: "updatedClass",
  class_type: "Swimming",
  class_intensity: "Hard",
  class_location: "Underthesea",
  start_time: "Tomorrow",
  class_duration: "1hr",
  class_max_size: "23",
};

beforeAll(async (done) => {
  await db("users")
    .truncate()
    .then(await db("class").truncate())
    .then(await db("clients_registered").truncate())
    .then(
      request(server)
        .post("/api/auth/register")
        .send({
          username: "BikiniBottom",
          password: "password",
          role: "client ",
        })
        .then((res) => {
          token = res.body.token;
          console.log(token);
          done();
        })
    );
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

describe("Test login", () => {
  test("Status 201", () => {
    return request(server)
      .post("/api/auth/login")
      .send({ username: "MrKrabs", password: "moneymoney" })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
});

describe("Tests endpoints that require a token", () => {
  test("Return 200 for /api/users", () => {
    return request(server)
      .get("/api/users")
      .set("authorization", `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("Return BikiniBottom for individual user: /api/users/1", () => {
    return request(server)
      .get("/api/users/1")
      .set("authorization", `bearer ${token}`)
      .then((res) => {
        expect(res.body.username).toBe("BikiniBottom");
      });
  });

  test("Testing adding a class: /api/users/1/class", async () => {
    await request(server)
      .post("/api/users/1/class")
      .set("authorization", `bearer ${token}`)
      .send(newClass)
      .then((res) => {
        expect(res.body.id).toBe(1);
      });
  });

  test("Testing retrieving a class status 200: /api/users/1/class", () => {
    return request(server)
      .get("/api/users/1/class")
      .set("authorization", `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("GET 200 /api/class", () => {
    return request(server)
      .get("/api/class")
      .set("authorization", `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("Testing retriving a class by Id", () => {
    return request(server)
      .get("/api/class/1")
      .set("authorization", `bearer ${token}`)
      .then((res) => {
        expect(res.body.id).toBe(1);
      });
  });

  test("Testing adding a student to a class by id", () => {
    return request(server)
      .post("/api/class/1/clients")
      .set("authorization", `bearer ${token}`)
      .send({ client_name: "MyLegGuy" })
      .then((res) => {
        expect(res.body.message).toBe("MyLegGuy has signed up for the class");
      });
  });

  test("Test getting a students from a class by id: STATUS 200", () => {
    return request(server)
      .get("/api/class/1/clients")
      .set("authorization", `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("Deleting a class: Status 200", async () => {
    await request(server)
      .delete("/api/class/1")
      .set("authorization", `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("Getting all Clients that registered to a class: STATUS 200", () => {
    return request(server)
      .get("/api/registered_client")
      .set("authorization", `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  test("Delete a student from a class", () => {
    return request(server)
      .delete("/api/registered_client/1")
      .set("authorization", `bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
