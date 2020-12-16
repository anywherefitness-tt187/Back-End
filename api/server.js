const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

server.use(helmet());
server.use(express.json());
server.user(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "Build week api is up" });
});

module.exports = server;
