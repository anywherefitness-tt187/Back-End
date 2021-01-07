const jwt = require("jsonwebtoken");
const secret = require("../auth/config/secret");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid Token/User" });
      } else {
        res.decodedJWT = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized access, please sign in" });
  }
};
