const user = require("../api/users/users-model");
const jwt = require("jsonwebtoken");
const secret = require("../auth/config/secret");
const { jwtSecret } = require("../auth/config/secret");

module.exports = {
  validateUserId,
  restricted,
};

function validateUserId(req, res, next) {
  const { id } = req.params;

  user
    .findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .json({ message: "invalid user id, user does not exist" });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log("Error getting id", err);
    });
}

function restricted(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        res.decodedTokenJWT = decodedToken;
        next();
      }
    });
  }
  res.status(401).json({ message: "Token required" });
}
