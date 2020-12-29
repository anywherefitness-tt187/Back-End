const router = require("express").Router();
const registered = require("./registered-model");

//get all the Clients that have registered to classes
router.get("/", (req, res) => {
  registered.find().then((clients) => {
    res.status(200).json(clients);
  });
});

//get client by id

router.get("/:id"),
  (req, res) => {
    registered
      .findRegisteredClientById()
      .then(res.status(200).json(clients))
      .then((err) => {
        res.send(err);
      });
  };

//delete client from class
router.delete("/:id", (req, res) => {
  registered
    .removeClient(req.params.id)
    .then(() => {
      res.send("Client removed from class");
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
