const router = require("express").Router();
const registered = require("./registered-model");

router.get("/", (req, res) => {
  registered.find().then((clients) => {
    res.status(200).json(clients);
  });
});

module.exports = router;
