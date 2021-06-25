const router = require("express").Router(); //express router
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  // handles http coming get requests on the /users path
  User.find() // /user/
    .then((users) => res.json(users)) //returning users that we got from our database
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  // handles http post requests
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
