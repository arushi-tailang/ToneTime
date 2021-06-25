const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); //connecting to mongoDB database

require("dotenv").config(); //includes enviornment variables

const app = express();
const port = process.env.PORT || 5000; //express server

app.use(cors()); //middleware
app.use(express.json()); //sending and recieving the json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  //once the connection is open, its going to log whats written inside
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercise");
const usersRouter = require("./routes/user");

app.use("/exercises", exercisesRouter); //when the page will go to /exercises then it will load exercisesRouter which is ./routes/exercises
app.use("/users", usersRouter);

app.listen(port, () => {
  //starting the server by listning the server port
  console.log(`server is running on port: ${port}`);
});
