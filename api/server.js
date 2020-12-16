const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ api: "Build week api is up" });
});

module.exports = server;
