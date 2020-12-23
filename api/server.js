const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const classRouter = require("../class/class-router");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/class", classRouter);

server.get("/", (req, res) => {
  res.json({ api: "Build week api is up" });
});

module.exports = server;
