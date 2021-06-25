const router = require("express").Router(); //express router
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  // handles http coming get requests on the /exercise path
  Exercise.find() // /exercise/
    .then((exercises) => res.json(exercises)) //after we find all the exercises from the data base, we'll take those exercises and return them as json
    .catch((err) => res.status(400).json("Error: " + err)); //or else, there's an error
});

router.route("/add").post((req, res) => {
  // handles http post requests
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save() //saving/adding exercise
    .then(() => res.json("Exercises added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  // returning information about just that exercise
  Exercise.findById(req.params.id) // getting id directly from the URL
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  // deleting information about just that exercise
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
