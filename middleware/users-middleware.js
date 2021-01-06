const user = require("../api/users/users-model");
const jwt = require("jsonwebtoken");
const secret = require("../auth/config/secret");

module.exports = {
  validateUserId,
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
