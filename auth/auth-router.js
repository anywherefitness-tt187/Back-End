const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./config/secret");

const router = require("express").Router();
const users = require("../api/users/users-model");
const { isValid } = require("../middleware/valid");

router.post("/register", async (req, res, next) => {
  const cred = req.body;
  try {
    if (isValid(cred)) {
      const rounds = process.env.BCRPYT_ROUNDS || 8;
      const hash = bcryptjs.hashSync(cred.password, rounds);
      cred.password = hash;
      const user = await users.add(cred);
      const token = generateToken(user);
      res.status(201).json({ data: `id ${user.id}`, cred, token });
    } else {
      res.status(400).json({ message: "username or password is missing" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Username is already taken" });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await users.findBy({ username }).first();

    if (user && bcryptjs.compareSync(password, user.password)) {
      const token = generateToken({ username, password });
      res
        .status(200)
        .json({
          id: `${user.id}`,
          message: `Welcome ${user.username},`,
          token: token,
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
};

module.exports = router;
