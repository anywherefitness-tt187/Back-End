const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const usersRouter = require("./users/users-router");
const authRouter = require("../auth/auth-router");
const classRouter = require("./class/class-router");
const registeredRouter = require("./registered/registered-router");
const restricted = require("../middleware/restricted-middleware");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/class", restricted, classRouter);
server.use("/api/registered_client", restricted, registeredRouter);

server.get("/", (req, res) => {
  res.json({ api: "Build week api is up" });
});

module.exports = server;
